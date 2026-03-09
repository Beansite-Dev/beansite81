@echo off;
echo "Starting Build...";
pnpm build
echo "Deploying firebase/vercel";
pnpm firebase deploy & pnpm vercel --prod;
echo "Finished!"