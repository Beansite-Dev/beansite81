echo -e "---\nStarting Build...";
echo -e "=> pnpm i"
echo -e "=> pnpm build\n---\n\n"
pnpm i
pnpm build
echo -e "\n---\nDeploying firebase/vercel";
echo -e "=> firebase deploy"
echo -e "=> vercel --prod\n---\n\n"
pnpm firebase deploy & pnpm vercel --prod;
echo -e "\n\n---\nFinished!"