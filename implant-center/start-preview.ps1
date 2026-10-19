$previewPython = 'C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe'
& $previewPython -m http.server 8771 --bind 127.0.0.1 --directory (Join-Path $PSScriptRoot 'dist')
