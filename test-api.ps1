$body = @{
    reaction = "heart"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri 'http://localhost:3000/api/blog/-finding-balance-in-a-busy-world/reactions' -Method POST -Headers @{'Content-Type'='application/json'} -Body $body -ErrorAction SilentlyContinue
Write-Host "Status: $($response.StatusCode)"
Write-Host "Body:"
Write-Host $response.Content
