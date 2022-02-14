

export class M3u8Clawer {

    // let fs =require('fs');
    // let readline=require('readline');
    // let request = require("request");
    // let path = require("path")
     
    // let rl=readline.createInterface({
    //     input:process.stdin,
    //     output:process.stdout
    // })
    // function ques(){//m3u8文件路径
    //     return new Promise(function(resolve,reject){
    //         rl.question('路径？\n',function(ans){
    //             resolve(ans);
    //         })
    //     })
    // }
    // async function create(){
    //     let res = await ques()
    //     let fileStr = fs.readFileSync(res, "utf8");
    //     let kwArr = fileStr.match(/(start=\d+)&(end=\d+)/g)
        
    //     //创建文件夹目录
    //     var dirPath = path.join(__dirname, "file");
    //     if (!fs.existsSync(dirPath)) {
    //         fs.mkdirSync(dirPath);
    //         console.log("文件夹创建成功");
    //     } else {
    //         console.log("文件夹已存在");
    //     }
        
    //     //循环多线程下载
    //     kwArr.forEach((v,i)=>{
    //         let start = v.split('&')[0].split('=')[1]
    //         let end = v.split('&')[1].split('=')[1]
    //         console.log('start:',start,'end:',end)
    //         let url = `https://encrypt-k-vod.xiaoe-tech.com/9764a7a5vodtransgzp1252524126/609e6b565285890799813207086/drm/v.f230.ts?start=${start}&end=${end}&type=mpegts&t=5fe4575f&sign=1da9dbb8525129ed54bd58ab5ae84680&whref=appwbcgvkzf4961.pc.xiaoe-tech.com&us=ofWpbDcVF57P`
    //         let fileName = `out-${start}-${end}.ts`;
     
    //         let options = {
    //             url,
    //             headers: {
    //                 'Accept': '*/*',
    //                 'Accept-Encoding': 'gzip, deflate, br',
    //                 'Accept-Language': 'zh-CN,zh;q=0.9',
    //                 'Cache-Control': 'no-cache',
    //                 'Connection': 'keep-alive',
    //                 'Host': 'encrypt-k-vod.xiaoe-tech.com',
    //                 'Origin': 'https://appwbcgvkzf4961.pc.xiaoe-tech.com',
    //                 'Pragma': 'no-cache',
    //                 'Referer': 'https://appwbcgvkzf4961.pc.xiaoe-tech.com/',
    //                 'Sec-Fetch-Dest': 'empty',
    //                 'Sec-Fetch-Mode': 'cors',
    //                 'Sec-Fetch-Site': 'same-site',
    //                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    //             },
    //         }
    //         let stream = fs.createWriteStream(path.join(dirPath, fileName));
    //         request(options).pipe(stream).on("close", function (err) {
    //             console.log("文件[" + fileName + "]下载完毕");
    //             if(kwArr.length === i + 1) {
    //                 console.log("----------所有文件下载完毕----------");
    //                 composite()
    //             }
    //         });
     
    //         function composite() {
    //         　　// "/b"：表示按二进制合并；不加就默认按字符转合并，会出问题
    //             exec("copy /b C:\Users\HC101\Desktop\express\file\*.ts C:\Users\HC101\Desktop\output\100 | 组织创新顶层架构设计（下）.ts", (error, stdout, stderr) => {
    //                 if (error) {
    //                     console.error(`执行的错误: ${error}`);
    //                     return;
    //                 }
    //                 console.log(`stdout: ${stdout}`);
    //                 console.error(`stderr: ${stderr}`);
    //             });
    //         }
    //     })
    // }
}
