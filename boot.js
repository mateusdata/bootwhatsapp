
const puppeteer = require("puppeteer");

try {
    async function main() {
        const contatos = [
            "Felipe",
            "Marcos",
            "Cesar",
            "Joelfd"
        ];

        // Cria uma instância do navegador
        const navegador = await puppeteer.launch({ headless: false, 
        executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        ignoreDefaultArgs: false,
        args:[
           // "--user-data-dir=C:\\Users\\mateu\\AppData\\Local\\Google\\Chrome\\User Data",
            //"--profile-directory=C:\\Users\\mateu\\AppData\\Local\\Google\\Chrome\\User Data\\Default",
        ]});
        // Cria uma nova página do navegador
        const page = await navegador.newPage();
        // Modifica o Cabeçalho de usuário
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36");
        // Abre na página a url especificada
        await page.goto("https://web.whatsapp.com");


        //procurando contato
        //Botao enviar _3HQNh _1Ae7k
        //Caixa de Texto _13NKt copyable-text selectable-text
        //Contato _2nY6U vq6sj

        //Espera pela presença da lista de contatos
        await page.waitForSelector("._3m_Xw", options = { timeout: 864000000 }); //classe do contato

        await delay(60000);

        for (let i = 0; i < contatos.length; i++) {
            try{
                // Espera pela presença de um contato específico e clica
                await page.click(`span[title='${contatos[i]}']`);
            }catch(e){
                console.log("CONTACT NOT FOUND!!!");
                return;
            }
            

            // Espera pela presença do campo de texto
            await page.waitForSelector(".p3_M1"); //campo da classe
            const editor = await page.$("div[tabindex='-1']"); //campo de texto 
            await editor.focus();

            const qMenssagem = 4;

            for (let i = 0; i < qMenssagem; i++) {
                await page.evaluate(() => {
                    const messagem = "Teste robo ignore as mensagens \n\n";
                    document.execCommand("insertText", false, messagem);
                    document.exec
                });
                // Espera e clica no botão de enviar
                await page.click("span[data-testid='send']"); //tag span do botão
                await delay(500);
            }


        }

    };

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        })
    }

    main();
    while (main() == true) {
        main();
    };
} catch (error) {
    console.error(error);
}
