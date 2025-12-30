// Blog content types and utilities for GitHub-driven markdown loading

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

// Blog registry - maps slugs to their markdown file paths
// When switching to GitHub, only this configuration needs to change
const blogRegistry: { slug: string; path: string; meta: Omit<BlogPost, 'content' | 'slug'> }[] = [
  {
    slug: 'authentication',
    path: '/content/blogs/authentication.md',
    meta: {
      title: 'Authentication: Why it Matters in Algo Trading',
      summary: 'Authentication is the foundation of every algorithmic trading system. Learn how Nubra solves friction with multiple authentication pathways built for automation.',
      tags: ['Authentication', 'SDK', 'Automation'],
      readTime: '8 min',
      publishDate: '2024-12-20',
      author: 'Nubra Engineering',
    },
  },
  {
    slug: 'uat-vs-live',
    path: '/content/blogs/uat-vs-live.md',
    meta: {
      title: 'UAT vs LIVE: Why Sandbox Testing Matters in Algo Trading',
      summary: 'Before deploying automation into production, every serious algo trader should deeply understand how UAT and LIVE environments differ.',
      tags: ['Testing', 'UAT', 'Infrastructure'],
      readTime: '6 min',
      publishDate: '2024-12-18',
      author: 'Nubra Engineering',
    },
  },
  {
    slug: 'place-order',
    path: '/content/blogs/place-order.md',
    meta: {
      title: 'Placing Orders: The Core of Algo Execution',
      summary: 'Placing orders is where signals turn into real action. Learn about the 4 pillars of every order and how to use Nubra\'s Trading API.',
      tags: ['Trading', 'API', 'Orders'],
      readTime: '12 min',
      publishDate: '2024-12-15',
      author: 'Nubra Engineering',
    },
  },
];

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, body: content };
  }
  
  const frontmatterStr = match[1];
  const body = content.slice(match[0].length);
  
  const frontmatter: Record<string, string> = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, body };
}

// Fetch markdown content from path
async function fetchMarkdownContent(path: string): Promise<string> {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching markdown from ${path}:`, error);
    return '';
  }
}

// Get all blog posts with metadata (content loaded on demand)
export async function getAllPosts(): Promise<BlogPost[]> {
  return blogRegistry.map(entry => ({
    slug: entry.slug,
    ...entry.meta,
    content: '', // Content loaded separately via getPostBySlug
  })).sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

// Get a single post by slug with full content
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const entry = blogRegistry.find(e => e.slug === slug);
  
  if (!entry) {
    return null;
  }
  
  const rawContent = await fetchMarkdownContent(entry.path);
  
  if (!rawContent) {
    return null;
  }
  
  // Parse and strip frontmatter, return only the body
  const { body } = parseFrontmatter(rawContent);
  
  return {
    slug: entry.slug,
    ...entry.meta,
    content: body.trim(),
  };
}

// Get all unique tags from posts
export async function getAllTags(): Promise<string[]> {
  const allTags = new Set<string>();
  
  blogRegistry.forEach(entry => {
    entry.meta.tags.forEach(tag => allTags.add(tag));
  });
  
  return Array.from(allTags).sort();
}

// Get posts filtered by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}
