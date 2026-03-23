const fs = require('fs');
const path = require('path');

// Read the blog.json file
const blogFilePath = path.join(__dirname, 'blog.json');
const content = fs.readFileSync(blogFilePath, 'utf8');
const posts = JSON.parse(content);

// Clean up reactions: keep only valid keys
posts.forEach((post) => {
  const validKeys = ['comment', 'heart', 'share'];
  const cleanedReactions = {};
  
  for (const key of validKeys) {
    if (key in post.reactions) {
      cleanedReactions[key] = post.reactions[key];
    }
  }
  
  post.reactions = cleanedReactions;
});

// Write back with proper UTF-8 encoding
fs.writeFileSync(blogFilePath, JSON.stringify(posts, null, 2) + '\n', 'utf8');
console.log('✓ Blog.json cleaned up successfully!');
console.log(`  - Removed corrupted emoji reaction keys`);
console.log(`  - Kept valid reaction keys: comment, heart, share`);
