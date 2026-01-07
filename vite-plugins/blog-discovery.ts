import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

/**
 * Vite plugin that auto-discovers blog folders in public/content/blogs
 * and generates a virtual module with the list of blog slugs.
 * 
 * This enables true auto-discovery - just add a new folder with index.md
 * and it will automatically appear in the blog listing.
 */
export function blogDiscoveryPlugin(): Plugin {
  const virtualModuleId = 'virtual:blog-registry';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const blogsDir = path.resolve(process.cwd(), 'public/content/blogs');

  function discoverBlogs(): string[] {
    if (!fs.existsSync(blogsDir)) {
      return [];
    }

    const entries = fs.readdirSync(blogsDir, { withFileTypes: true });
    const slugs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexPath = path.join(blogsDir, entry.name, 'index.md');
        if (fs.existsSync(indexPath)) {
          slugs.push(entry.name);
        }
      }
    }

    return slugs.sort();
  }

  return {
    name: 'blog-discovery',
    
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const slugs = discoverBlogs();
        return `export const blogSlugs = ${JSON.stringify(slugs)};`;
      }
    },
    
    // Watch the blogs directory for changes during dev
    configureServer(server) {
      server.watcher.add(blogsDir);
      
      server.watcher.on('all', (event, filePath) => {
        if (filePath.startsWith(blogsDir)) {
          // Invalidate the virtual module when blogs change
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
          }
        }
      });
    },
  };
}
