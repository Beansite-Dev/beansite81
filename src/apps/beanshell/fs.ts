import { atom } from "jotai";
import { CHANGELOG } from "../../App";
import { generateId } from "../../sdk/Lib";
import { Icons } from "../../sdk/components/Enum";
const FileSystemData:fs.DirectoryBase={
  "System81":{
    name:"System81",
    id:generateId(10),
    isDirectory:true,
    attributes:{
      dateCreated:new Date(),
      dateModified:new Date(),
      openWithNotepad:false,
    },
    children:{
      "icons":{
        name:"icons",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          ...Object.fromEntries(Object.entries(Icons).map(([icon,src])=>[`${icon}.png`,{
            name:icon,
            isDirectory:false,
            type:"image",
            content:src,
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
            },
          }as fs.File])),
        },
      }, 
    },
  },
  "ProgramFiles":{
    name:"ProgramFiles",
    id:generateId(10),
    isDirectory:true,
    attributes:{
      dateCreated:new Date(),
      dateModified:new Date(),
      openWithNotepad:false,
    },
    children:{
      "win1":{
        name:"win1",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "win1.exe":{
            name:"win1",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"win1",
            },
          },
        },
      },
      "changelog":{
        name:"changelog",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "changelog.exe":{
            name:"changelog",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"changelog",
            },
          },
          "data.json":{
            name:"data",
            isDirectory:false,
            type:"json",
            content:JSON.stringify(CHANGELOG),
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:true,
            },
          },
        },
      },
      "settings":{
        name:"settings",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "settings.exe":{
            name:"settings",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"settings",
            },
          },
        },
      },
      "beanpowered":{
        name:"beanpowered",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "beanpowered.exe":{
            name:"beanpowered",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"beanpowered",
            },
          },
        },
      },
      "beanforged":{
        name:"beanforged",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "beanforged.exe":{
            name:"beanforged",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"beanforged",
            },
          },
        },
      },
      "blog":{
        name:"blog",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "blog.exe":{
            name:"blog",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"blog",
            },
          },
        },
      },
      "explorer":{
        name:"explorer",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "explorer.exe":{
            name:"explorer",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"exploere",
            },
          },
        },
      },
      "beanshell":{
        name:"beanshell",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "beanshell.exe":{
            name:"beanshell",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"beanshell",
            },
          },
        },
      },
      "notepad":{
        name:"notepad",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "notepad.exe":{
            name:"notepad",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"notepad",
            },
          },
        },
      },
      "debug":{
        name:"debug",
        id:generateId(10),
        isDirectory:true,
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
        },
        children:{
          "debug.exe":{
            name:"debug",
            isDirectory:false,
            type:"exe",
            content:"",
            id:generateId(10),
            attributes:{
              dateCreated:new Date(),
              dateModified:new Date(),
              openWithNotepad:false,
              exeLaunchTarget:"debug",
            },
          },
        },
      },
    },
  },
  "Downloads":{
    name:"Downloads",
    id:generateId(10),
    isDirectory:true,
    children:{},
    attributes:{
      dateCreated:new Date(),
      dateModified:new Date(),
      openWithNotepad:false,
    }
  },
  "Desktop":{
    name:"Desktop",
    id:generateId(10),
    isDirectory:true,
    attributes:{
      dateCreated:new Date(),
      dateModified:new Date(),
      openWithNotepad:false,
    },
    children:{
      "win1.lnk":{
        name:"win1",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"win1",
        },
      },
      "changelog.lnk":{
        name:"changelog",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"changelog",
        },
      },
      "settings.lnk":{
        name:"settings",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"settings",
        },
      },
      "beanpowered.lnk":{
        name:"beanpowered",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"beanpowered",
        },
      },
      "beanforged.lnk":{
        name:"beanforged",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"beanforged",
        },
      },
      "blog.lnk":{
        name:"blog",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"blog",
        },
      },
      "beanshell.lnk":{
        name:"beanshell",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"beanshell",
        },
      },
      "explorer.lnk":{
        name:"explorer",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"explorer",
        },
      },
      "notepad.lnk":{
        name:"notepad",
        isDirectory:false,
        type:"lnk",
        content:"",
        id:generateId(10),
        attributes:{
          dateCreated:new Date(),
          dateModified:new Date(),
          openWithNotepad:false,
          exeLaunchTarget:"notepad",
        },
      },
    },
  },
  "help.txt":{
    name:"help",
    isDirectory:false,
    type:"txt",
    content:`Welcome to Beansite 8.1's Explorer/Beanshell module!
This is a virtual file system that you can interact with. 
It contains some system files and directories to get you started, and you can create your own as well.

If you are in the Explorer, you can navigate through the directories by clicking on them.
You can also use the search bar to quickly find files and directories. Just type in the name and it will show you the results as you type!
To open a file, just click on it! If it's an executable file, it will run. If it's a text file, it will open in Notepad. You can also create new files and directories by right-clicking in the Explorer and selecting "New File" or "New Directory".

As for commandline users, all commands can be found by using the "help" command. This will outline usage of all commands you will need to use for navigating and manipulating the file system using commandline, among other commands. Useful commands inlude cd, mv, dir, cp, rm, rmdir, and more.
You may be required to use a command, such as nano, cat, or tac to edit and view file contents. 
`,
    id:generateId(10),
    attributes:{
      dateCreated:new Date(),
      dateModified:new Date(),
      openWithNotepad:true,
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