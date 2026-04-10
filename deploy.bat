@echo off
cls
set t0=%time: =0%
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

set t=%time: =0%
set /a h=1%t0:~0,2%-100
set /a m=1%t0:~3,2%-100
set /a s=1%t0:~6,2%-100
set /a c=1%t0:~9,2%-100
set /a starttime = %h% * 360000 + %m% * 6000 + 100 * %s% + %c%
set /a h=1%t:~0,2%-100
set /a m=1%t:~3,2%-100
set /a s=1%t:~6,2%-100
set /a c=1%t:~9,2%-100
set /a endtime = %h% * 360000 + %m% * 6000 + 100 * %s% + %c%
set /a runtime = %endtime% - %starttime%
set runtime = %s%.%c%
echo Finished!
echo Started at %t0%
echo Ran for %runtime%0 ms
pause