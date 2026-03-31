@echo off
cls
echo ---
echo Starting Build...
echo =^> pnpm i
echo =^> pnpm build
echo ---
echo.
echo.
call pnpm i
call pnpm build
echo.
echo ---
echo Deploying firebase/vercel
echo =^> firebase deploy
echo =^> vercel --prod
echo ---
echo.
echo.
call pnpm firebase deploy
call pnpm vercel --prod
echo.
echo.
echo ---
echo Finished!