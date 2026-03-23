# Read the blog.json file
$json = Get-Content 'c:\Users\HomePC\ommsulaimv2\blog.json' -Raw | ConvertFrom-Json

# Remove the corrupted emoji keys from reactions
foreach ($post in $json) {
  $newReactions = @{}
  foreach ($key in @($post.reactions.PSObject.Properties.Name)) {
    # Keep only the valid keys (comment, heart, share)
    if ($key -in @('comment', 'heart', 'share')) {
      $newReactions[$key] = $post.reactions.$key
    }
  }
  $post.reactions = $newReactions
}

# Write the cleaned JSON back
$json | ConvertTo-Json -Depth 10 | Out-File 'c:\Users\HomePC\ommsulaimv2\blog.json' -Encoding UTF8
Write-Host "blog.json has been cleaned up!"
