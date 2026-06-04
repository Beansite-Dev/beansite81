declare namespace fs {
  interface FileAttributes{
    readOnly?:boolean;
    hidden?:boolean;
    system?:boolean;
    openWithNotepad?:boolean;
    dateCreated?:Date;
    dateModified?:Date;
    exeLaunchTarget?:string;
  }
  interface FileSystemBaseObject{
    name:string;
    id:string;
    isDirectory:boolean;
    attributes:fs.FileAttributes;
  }
  interface File extends fs.FileSystemBaseObject{
    type:string;
    content:string;//|React.ReactElement|React.ReactElement[]|Element|Element[]|null;
  }
  interface DirectoryBase{[key:string]:fs.DirectoryBase|fs.File|fs.Directory;}
  interface Directory extends fs.FileSystemBaseObject{
    children:fs.DirectoryBase;
  }
}