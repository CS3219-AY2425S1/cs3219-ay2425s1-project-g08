@echo off
setlocal

rem Get the current directory
set CURRENT_DIR=%~dp0

rem Run the Super-Linter
docker run ^
-e LOG_LEVEL=ERROR ^
-e RUN_LOCAL=true ^
-e VALIDATE_JAVASCRIPT_ES=true ^
-e VALIDATE_TYPESCRIPT_ES=true ^
-e VALIDATE_JSX=true ^
-e VALIDATE_TSX=true ^
-e VALIDATE_JAVA=true ^
-v "%CURRENT_DIR%:/tmp/lint" ^
--rm ^
ghcr.io/super-linter/super-linter:slim-v5.7.2

endlocal
