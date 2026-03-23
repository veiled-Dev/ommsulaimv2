$posts = Get-Content 'c:\Users\HomePC\ommsulaimv2\blog.json' | ConvertFrom-Json

foreach ($post in $posts) {
  Write-Host "Testing post: $($post.slug)"
  $body = @{ reaction = 'heart' } | ConvertTo-Json
  try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/blog/$($post.slug)/reactions" -Method POST -Headers @{'Content-Type'='application/json'} -Body $body -ErrorAction SilentlyContinue
    Write-Host "  Status: $($response.StatusCode)"
    if ($response.StatusCode -ne 200) {
      Write-Host "  ERROR: $($response.Content)"
    }
  } catch {
    Write-Host "  ERROR: $_"
  }
  Write-Host ""
}
