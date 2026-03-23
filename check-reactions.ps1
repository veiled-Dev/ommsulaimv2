$json = Get-Content 'c:\Users\HomePC\ommsulaimv2\blog.json' -Raw | ConvertFrom-Json
Write-Host "First post reactions:"
$json[0].reactions | ConvertTo-Json
