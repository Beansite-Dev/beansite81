{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    pnpm
    git
    git-lfs
    htop
    go
    xdg-utils
  ];
}