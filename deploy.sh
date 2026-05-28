#!/bin/bash
SECONDS=0
echo -e "---\nPushing to gitea...";
echo -e "=> git push https://gitea.com/m1dnight/beansite81\n---\n\n"
git push https://gitea.com/m1dnight/beansite81
echo -e "---\nStarting Build...";
echo -e "=> pnpm i"
echo -e "=> pnpm build\n---\n\n"
pnpm i
pnpm build
echo -e "\n---\nDeploying firebase/vercel";
echo -e "=> firebase deploy"
echo -e "=> vercel --prod\n---\n\n"
pnpm firebase deploy & pnpm vercel --prod;
mv stats.html /public/
echo -e "\n\n---\nFinished!"
echo "Ran for $SECONDS s"