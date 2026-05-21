declare type GiteaApiRoot=Root[];
declare interface Root{
  url:string;
  sha:string;
  created:string;
  html_url:string;
  commit:Commit;
  author?:Author2;
  committer:Committer2;
  parents:Parent[];
  files:File[];
  stats:Stats;
};
declare interface Commit {
  url:string;
  author:Author;
  committer:Committer;
  message:string;
  tree:Tree;
  verification:Verification;
}
declare interface Author {
  name:string;
  email:string;
  date:string;
}
declare interface Committer {
  name:string;
  email:string;
  date:string;
}
declare interface Tree {
  url:string;
  sha:string;
  created:string;
}
declare interface Verification {
  verified:boolean;
  reason:string;
  signature:string;
  signer:any;
  payload:string;
}
declare interface Author2 {
  id:number;
  login:string;
  login_name:string;
  source_id:number;
  full_name:string;
  email:string;
  avatar_url:string;
  html_url:string;
  language:string;
  is_admin:boolean;
  last_login:string;
  created:string;
  restricted:boolean;
  active:boolean;
  prohibit_login:boolean;
  location:string;
  website:string;
  description:string;
  visibility:string;
  followers_count:number;
  following_count:number;
  starred_repos_count:number;
  username:string;
}
declare interface Committer2 {
  id:number;
  login:string;
  login_name:string;
  source_id:number;
  full_name:string;
  email:string;
  avatar_url:string;
  html_url:string;
  language:string;
  is_admin:boolean;
  last_login:string;
  created:string;
  restricted:boolean;
  active:boolean;
  prohibit_login:boolean;
  location:string;
  website:string;
  description:string;
  visibility:string;
  followers_count:number;
  following_count:number;
  starred_repos_count:number;
  username:string;
}
declare interface Parent {
  url:string;
  sha:string;
  created:string;
}
declare interface File {
  filename:string;
  status:string;
}
declare interface Stats {
  total:number;
  additions:number;
  deletions:number;
}