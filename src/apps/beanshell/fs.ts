import { atom } from "jotai";
import { CHANGELOG } from "../../App";
import { generateId } from "../../sdk/Lib";
const FileSystemData:fs.DirectoryBase={
  "System81":{
    name:"System81",
    id:generateId(10),
    children:{},
    isDirectory:true,
  },
  "ProgramFiles":{
    name:"ProgramFiles",
    id:generateId(10),
    isDirectory:true,
    children:{
      "win1":{
        name:"win1",
        id:generateId(10),
        isDirectory:true,
        children:{
          "win1.exe":{
            name:"win1",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"win1",
          },
        },
      },
      "changelog":{
        name:"changelog",
        id:generateId(10),
        isDirectory:true,
        children:{
          "changelog.exe":{
            name:"changelog",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"changelog",
          },
          "data.json":{
            name:"data",
            isDirectory:false,
            type:"json",
            content:JSON.stringify(CHANGELOG),
            id:generateId(10),
          },
        },
      },
      "settings":{
        name:"settings",
        id:generateId(10),
        isDirectory:true,
        children:{
          "settings.exe":{
            name:"settings",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"settings",
          },
        },
      },
      "beanpowered":{
        name:"beanpowered",
        id:generateId(10),
        isDirectory:true,
        children:{
          "beanpowered.exe":{
            name:"beanpowered",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"beanpowered",
          },
        },
      },
      "beanforged":{
        name:"beanforged",
        id:generateId(10),
        isDirectory:true,
        children:{
          "beanforged.exe":{
            name:"beanforged",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"beanforged",
          },
        },
      },
      "blog":{
        name:"blog",
        id:generateId(10),
        isDirectory:true,
        children:{
          "blog.exe":{
            name:"blog",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"blog",
          },
        },
      },
      "beanshell":{
        name:"beanshell",
        id:generateId(10),
        isDirectory:true,
        children:{
          "beanshell.exe":{
            name:"beanshell",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            exeLaunchTarget:"beanshell",
          },
        },
      },
    },
  },
  "Downloads":{
    name:"Downloads",
    id:generateId(10),
    isDirectory:true,
    children:{}
  },
  "Desktop":{
    name:"Desktop",
    id:generateId(10),
    isDirectory:true,
    children:{
      "win1.lnk":{
        name:"win1",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"win1",
      },
      "changelog.lnk":{
        name:"changelog",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"changelog",
      },
      "settings.lnk":{
        name:"settings",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"settings",
      },
      "beanpowered.lnk":{
        name:"beanpowered",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"beanpowered",
      },
      "beanforged.lnk":{
        name:"beanforged",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"beanforged",
      },
      "blog.lnk":{
        name:"blog",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"blog",
      },
      "beanshell.exe":{
        name:"beanshell",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        exeLaunchTarget:"beanshell",
      },
    },
  },
};
export const FileSystemAtom=atom<fs.DirectoryBase>(FileSystemData);
export const FilePropertyModifierAtom=atom((get)=>get(FileSystemAtom),
  (get,set,update:[string[],string,string,any])=>{
    const[parentDirs,fileName,property,value]=update;
    console.table(update);
    const updateNested=(current:fs.DirectoryBase,pathSegments:string[]):fs.DirectoryBase=>{
      if(pathSegments.length===0){
        const target=current[fileName]as fs.File|fs.Directory;
        return{
          ...current,
          [fileName]: {
            ...target,
            [property]:value,
          }as fs.File|fs.Directory,
        };
      }
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{
        ...current,
        [head]:{...dir,children:updateNested(dir.children, tail),}as fs.Directory,
      };
    };
    set(FileSystemAtom,updateNested(get(FileSystemAtom),parentDirs));
  }
);
export const FileCreatorAtom=atom((get)=>get(FileSystemAtom),
  (get,set,update:[string[],string,fs.File])=>{
    const[parentDirs,fileKey,newFile]=update;
    const insertNested=(current:fs.DirectoryBase,pathSegments:string[]):fs.DirectoryBase=>{
      if(pathSegments.length===0)
        return({...current,[fileKey]:newFile,}as fs.DirectoryBase);
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{
        ...current,
        [head]:{...dir,children:insertNested(dir.children, tail),}as fs.Directory,
      };
    };
    set(FileSystemAtom,insertNested(get(FileSystemAtom),parentDirs));
  }
);
export const FileDeletorAtom=atom((get)=>get(FileSystemAtom),
  (get,set,update:[string[],string])=>{
    const [parentDirs,fileKey]=update;
    const deleteNested=(current:fs.DirectoryBase,pathSegments:string[]):fs.DirectoryBase=>{
      if(pathSegments.length===0){
        const{[fileKey]:_,...rest}=current;
        return rest;
      }
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{
        ...current,
        [head]:{...dir,children: deleteNested(dir.children, tail),}as fs.Directory,
      };
    };
    set(FileSystemAtom,deleteNested(get(FileSystemAtom),parentDirs));
  }
);
export const FileMoverAtom=atom((get)=>get(FileSystemAtom),
  (get,set,update:[string[],string,string[]])=>{
    const[sourceDirs,fileKey,destDirs]=update;
    const getTarget=(current:fs.DirectoryBase,pathSegments:string[]):fs.File|fs.Directory=>{
      if(pathSegments.length===0)return current[fileKey]as fs.File|fs.Directory;
      const[head,...tail]=pathSegments;
      return getTarget((current[head]as fs.Directory).children,tail);
    };
    const deleteNested=(current:fs.DirectoryBase,pathSegments:string[]):fs.DirectoryBase=>{
      if(pathSegments.length===0){const{[fileKey]:_,...rest}=current;return rest;}
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{...current,[head]:{...dir,children:deleteNested(dir.children,tail),}as fs.Directory,};
    };
    const insertNested=(current:fs.DirectoryBase,pathSegments:string[],target:fs.File|fs.Directory):fs.DirectoryBase=>{
      if(pathSegments.length===0)return{...current,[fileKey]:target,};
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{...current,
        [head]:{...dir,children: insertNested(dir.children, tail, target),}as fs.Directory,
      };
    };
    const fs=get(FileSystemAtom);
    const target=getTarget(fs,sourceDirs);
    const afterDelete=deleteNested(fs, sourceDirs);
    const afterInsert=insertNested(afterDelete, destDirs, target);
    set(FileSystemAtom,afterInsert);
  }
);
export const FileCopierAtom=atom(
  (get)=>get(FileSystemAtom),
  (get,set,update:[string[],string,string[]])=>{
    const[sourceDirs,fileKey,destDirs]=update;
    const getTarget=(current:fs.DirectoryBase,pathSegments:string[]):fs.File|fs.Directory=>{
      if(pathSegments.length===0)return current[fileKey]as fs.File|fs.Directory;
      const[head,...tail]=pathSegments;
      return getTarget((current[head]as fs.Directory).children,tail);
    };
    const insertNested=(current:fs.DirectoryBase,pathSegments:string[],target:fs.File|fs.Directory):fs.DirectoryBase=>{
      if(pathSegments.length===0)return{
        ...current,
        [fileKey]:{
          ...target,
          id:generateId(10),
        }as fs.File|fs.Directory,
      };
      const[head,...tail]=pathSegments;
      const dir=current[head]as fs.Directory;
      return{
        ...current,
        [head]:{
          ...dir,
          children:insertNested(dir.children,tail,target),
        }as fs.Directory,
      };
    };
    const fs=get(FileSystemAtom);
    const target=getTarget(fs,sourceDirs);
    set(FileSystemAtom,insertNested(fs,destDirs,target));
  }
);