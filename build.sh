# https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux

# https://unix.stackexchange.com/questions/155046/determine-if-git-working-directory-is-clean-from-a-script
if output=$(git status --porcelain  --untracked-files=no) && [ -z "$output" ]; then
  # Working directory clean
  echo ""
else
  # Uncommitted changes
  echo -e "\033[1;31m COMMIT YOUR CHAGES TO THE REPOSITORY BEFORE BUILDING \e[0m"
  echo -e "\033[1;31m exiting... \e[0m"
  exit 0
fi

echo -e "\033[1;33m STEP 1: BUILDING \e[0m"
#yarn dist
npm run build --fix

echo -e "\033[1;33m STEP 2: SWITCHING TO DEPLOY BRANCH \e[0m"
# https://stackoverflow.com/questions/23698183/how-to-force-cp-to-overwrite-directory-instead-of-creating-another-one-inside
cp -TRv dist post-dist
git checkout deploy
cp -TRv post-dist dist

echo -e "\033[1;33m STEP 3: COMMITING \e[0m"
git add dist -f
git commit -m "Build"

echo -e "\033[1;33m STEP 4: PUSHING TO REMOTE \e[0m"
git push deployment deploy

echo -e "\033[1;33m STEP 5: SWITCHING BACK TO MASTER \e[0m"
git checkout master

echo -e "\033[1;33m STEP 6: CLEANING UP \e[0m"
rm -r post-dist