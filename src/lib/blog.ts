// Blog content types and utilities for folder-based markdown loading

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  author: string;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  summary: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  author: string;
}

// Blog registry - list of blog folder slugs
// Each slug corresponds to a folder in public/content/blogs/{slug}/
// containing index.md and an assets/ subfolder
const blogSlugs = [
  'authentication',
  'uat-vs-live',
  'place-order',
];

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: Record<string, unknown>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const frontmatterStr = match[1];
  const body = content.slice(match[0].length);
  
  const frontmatter: Record<string, unknown> = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Handle arrays (e.g., tags: ["a", "b"])
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          frontmatter[key] = JSON.parse(value);
        } catch {
          // If JSON parse fails, store as string
          frontmatter[key] = value;
        }
      } else {
        // Remove surrounding quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
      }
    }
  });
  
  return { frontmatter, body };
}

// Get the base path for a blog's assets
function getBlogBasePath(slug: string): string {
  return `/content/blogs/${slug}`;
}

// Transform relative asset paths in markdown to absolute paths
function transformAssetPaths(content: string, slug: string): string {
  const basePath = getBlogBasePath(slug);
  
  // Transform markdown image syntax: ![alt](./assets/image.png) -> ![alt](/content/blogs/slug/assets/image.png)
  let transformed = content.replace(
    /!\[([^\]]*)\]\(\.\/(assets\/[^)]+)\)/g,
    `![$1](${basePath}/$2)`
  );
  
  // Transform HTML img src: src="./assets/image.png" -> src="/content/blogs/slug/assets/image.png"
  transformed = transformed.replace(
    /src=["']\.\/assets\/([^"']+)["']/g,
    `src="${basePath}/assets/$1"`
  );
  
  return transformed;
}

// Fetch markdown content from a blog folder
async function fetchBlogContent(slug: string): Promise<{ frontmatter: Record<string, unknown>; body: string } | null> {
  const path = `${getBlogBasePath(slug)}/index.md`;
  
  try {
    const response = await fetch(path);
    if (!response.ok) {
      console.error(`Failed to fetch blog: ${slug}`);
      return null;
    }
    
    const rawContent = await response.text();
    const { frontmatter, body } = parseFrontmatter(rawContent);
    
    // Transform relative asset paths to absolute paths
    const transformedBody = transformAssetPaths(body, slug);
    
    return { frontmatter, body: transformedBody };
  } catch (error) {
    console.error(`Error fetching blog ${slug}:`, error);
    return null;
  }
}

// Get all blog posts with metadata (loads frontmatter from each blog)
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  
  // Fetch frontmatter from all blogs in parallel
  const results = await Promise.all(
    blogSlugs.map(async (slug) => {
      const result = await fetchBlogContent(slug);
      if (!result) return null;
      
      const { frontmatter } = result;
      
      return {
        slug,
        title: (frontmatter.title as string) || slug,
        summary: (frontmatter.summary as string) || '',
        tags: (frontmatter.tags as string[]) || [],
        readTime: (frontmatter.readTime as string) || '5 min',
        publishDate: (frontmatter.publishDate as string) || new Date().toISOString().split('T')[0],
        author: (frontmatter.author as string) || 'Nubra Engineering',
        content: '', // Content loaded separately via getPostBySlug
      };
    })
  );
  
  // Filter out nulls and sort by date
  results.forEach(post => {
    if (post) posts.push(post);
  });
  
  return posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

// Get a single post by slug with full content
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!blogSlugs.includes(slug)) {
    return null;
  }
  
  const result = await fetchBlogContent(slug);
  
  if (!result) {
    return null;
  }
  
  const { frontmatter, body } = result;
  
  return {
    slug,
    title: (frontmatter.title as string) || slug,
    summary: (frontmatter.summary as string) || '',
    tags: (frontmatter.tags as string[]) || [],
    readTime: (frontmatter.readTime as string) || '5 min',
    publishDate: (frontmatter.publishDate as string) || new Date().toISOString().split('T')[0],
    author: (frontmatter.author as string) || 'Nubra Engineering',
    content: body.trim(),
  };
}

// Get all unique tags from posts
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const allTags = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  
  return Array.from(allTags).sort();
}

// Get posts filtered by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}
