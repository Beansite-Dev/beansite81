declare namespace fs {
  interface FileSystemBaseObject{
    name:string;
    id:string;
    isDirectory:boolean;
  }
  interface FileAttributes{
    readOnly?:boolean;
    hidden?:boolean;
    system?:boolean;
    dateCreated?:Date;
    dateModified?:Date;
  }
  interface File extends fs.FileSystemBaseObject{
    type:string;
    content:string;
    attributes?:fs.FileAttributes;
    exeLaunchTarget?:string;
  }
  interface DirectoryBase{[key:string]:fs.DirectoryBase|fs.File|fs.Directory;}
  interface Directory extends fs.FileSystemBaseObject{
    children:fs.DirectoryBase;
    attributes?:fs.FileAttributes;
  }
}