const {hash} = require('bcryptjs')
const User = require('./src/app/models/usersModel')
const Chef = require('./src/app/models/chefsModel')
const Recipe = require('./src/app/models/recipesModel')
const Filesc = require('./src/app/models/file')
const Filesrecipe = require('./src/app/models/recipeFiles')

const users = []

async function createUsers(){

    const password = await hash('1111',8)

    users.push({
        name: "Ricardo santos",
        email: "admin@admin.com",
        password,
        is_admin:true,
    })

    const usersPromise = users.map(user => User.create(user))

    usersIds = await Promise.all(usersPromise)

}

files = []

async function createFiles(){

    files.push({
        //name: "1616638053721-burger.png",
        path:"public/assets/1616638053721-burger.png",
    })
    files.push({
        //name: "1616638093355-pizza.png",
        path:"public/assets/1616638093355-pizza.png",
    })
    files.push({
        //name: "1616638106874-asinhas.png",
        path:"publica/ssets/1616638106874-asinhas.png",
    })
    files.push({
        //name: "1616638076003-lasanha.png",
        path:"public/assets/1616638076003-lasanha.png",
    })
    files.push({
        //name: "1616638041287-espaguete.png",
        path:"public/assets/1616638041287-espaguete.png",
    })
    files.push({
        //name: "1616638065230-doce.png",
        path:"public/assets/1616638065230-doce.png",
    })

    const filesPromise = files.map(file => Filesc.create(file))

    ChefsIds = await Promise.all(filesPromise)

}

chefs =[]

async function createChefs(){
    file_id = 1
    chefs.push({
        name: 1,
        file_id
    })
    chefs.push({
        name: "Fabiana Melo",
        file_id:2
    })
    chefs.push({
        name: "Vania Steroski",
        file_id:3
    })
    chefs.push({
        name: "Juliano Vieira",
        file_id:4
    })
    chefs.push({
        name: "Júlia Kinoto",
        file_id:5
    })
    chefs.push({
        name: "Ricardo Golvea",
        file_id:6
    })

    const chefsPromise = chefs.map(chef => Chef.create(chef))

    ChefsIds = await Promise.all(chefsPromise)

}

// recipefiles = []

// async function createFilesrecipes(){

//     recipefiles.push({
//         recipe_id: 1,
//         file_id:7,
//     })
//     recipefiles.push({
//         recipe_id: 2,
//         file_id:8,
//     })
//     recipefiles.push({
//         recipe_id: 3,
//         file_id:9,
//     })
//     recipefiles.push({
//         recipe_id: 4,
//         file_id:10,
//     })
//     recipefiles.push({
//         recipe_id: 5,
//         file_id:11,
//     })
//     recipefiles.push({
//         recipe_id: 6,
//         file_id:12,
//     })

//     const recipefiles = recipefiles.map(recipefile => Filesrecipe.create(recipefile))

//     ChefsIds = await Promise.all(recipefiles)

// }

// recipes = []

// async function createRecipes(){


//     recipes.push({
//         title: "Triplo bacon burger",
//         chef_id: 1,
//         user_id:"",
//         ingredients:[
//             '3 kg de carne moída (escolha uma carne magra e macia)',
//             '300 g de bacon moído',
//             '1 ovo',
//             '3 colheres (sopa) de farinha de trigo',
//             '3 colheres (sopa) de tempero caseiro: feito com alho, sal, cebola, pimenta e cheiro verde processados no liquidificador',
//             '30 ml de água gelada'
//         ],
//         preparation:[
//             'Misture todos os ingredientes muito bem e amasse para que fique tudo muito bem misturado.',
//             'Faça porções de 90 g a 100 g.',
//             'Forre um plástico molhado em uma bancada e modele os hambúrgueres utilizando um aro como base.',
//             'Faça um de cada vez e retire o aro logo em seguida.',
//             'Forre uma assadeira de metal com plástico, coloque os hambúrgueres e intercale camadas de carne e plásticos (sem apertar).',
//             'Faça no máximo 4 camadas por forma e leve para congelar.',
//             'Retire do congelador, frite ou asse e está pronto.'
//         ],
//         information: "Preaqueça a chapa, frigideira ou grelha por 10 minutos antes de levar os hambúrgueres. Adicione um pouquinho de óleo ou manteiga e não amasse os hambúrgueres! \n\n Você sabia que a receita que precede o hambúrguer surgiu no século XIII, na Europa? A ideia de moer a carne chegou em Hamburgo no século XVII, onde um açougueiro resolveu também temperá-la. Assim, a receita foi disseminada nos Estados Unidos por alemães da região. Lá surgiu a ideia de colocar o hambúrguer no meio do pão e adicionar outros ingredientes, como queijo, tomates e alface.",
//     })

//     recipes.push({
//         title: 'Pizza 4 estações',
//         chef_id: 2,
//         user_id:"",
//         ingredients: [
//             '1 xícara (chá) de leite',
//             '1 ovo',
//             '1 colher (chá) de sal',
//             '1 colher (chá) de açúcar',
//             '1 colher (sopa) de margarina',
//             '1 e 1/2 xícara (chá) de farinha de trigo',
//             '1 colher (sobremesa) de fermento em pó',
//             '1/2 lata de molho de tomate',
//             '250 g de mussarela ralada grossa',
//             '2 tomates fatiados',
//             'azeitona picada',
//             'orégano a gosto'
//           ],
//           preparation: [
//             'No liquidificador bata o leite, o ovo, o sal, o açúcar, a margarina, a farinha de trigo e o fermento em pó até que tudo esteja encorporado.',
//             'Despeje a massa em uma assadeira para pizza untada com margarina e leve ao forno preaquecido por 20 minutos.',
//             'Retire do forno e despeje o molho de tomate.',
//             'Cubra a massa com mussarela ralada, tomate e orégano a gosto.',
//             'Leve novamente ao forno até derreter a mussarela.'
//           ],
//           information: 'Pizza de liquidificador é uma receita deliciosa e supersimples de preparar. Feita toda no liquidificador, ela é bem prática para o dia a dia. Aqui no TudoGostoso você também encontra diversas delícias práticas feitas no liquidificador: massa de panqueca, torta de frango de liquidificador, pão de queijo de liquidificador, bolo de banana, bolo de chocolate e muito mais!'
        
//     })

//     recipes.push({
//         title: 'Asinhas de frango ao barbecue',
//         chef_id: 3,
//         user_id:"",
//         ingredients: [
//             '12 encontros de asinha de galinha, temperados a gosto',
//             '2 colheres de sopa de farinha de trigo',
//             '1/2 xícara (chá) de óleo',
//             '1 xícara de molho barbecue'
//           ],
//           preparation: [
//             'Em uma tigela coloque o encontro de asinha de galinha e polvilhe a farinha de trigo e misture com as mãos.',
//             'Em uma frigideira ou assador coloque o óleo quando estiver quente frite até ficarem douradas.',
//             'Para servir fica bonito com salada, ou abuse da criatividade.'
//           ],
//           information: 'Muito boa com acompanhamento de molhos'
        
        
//     })

//     recipes.push({
//         title: "Lasanha mac n' cheese",
//         chef_id: 4,
//         user_id:"",
//         ingredients: [
//             'massa pronta de lasanha',
//             '400 g de presunto',
//             '400 g de mussarela ralada',
//             '2 copos de requeijão',
//             '150 g de mussarela para gratinar'
//           ],
//           preparation: [
//             'Em uma panela, coloque a manteiga para derreter.',
//             'Acrescente a farinha de trigo e misture bem com auxílio de um fouet.',
//             'Adicione o leite e misture até formar um creme homogêneo.',
//             'Tempere com sal, pimenta e noz-moscada a gosto.',
//             'Desligue o fogo e acrescente o creme de leite; misture bem e reserve.'
//           ],
//           information: 'Recheie a lasanha com o que preferir.'
//     })

//     recipes.push({
//         title: 'Espaguete ao alho',
//         chef_id: 5,
//         user_id:"",
//         ingredients: [
//             '1 pacote de macarrão 500 g (tipo do macarrão a gosto)',
//             '1 saquinho de alho granulado',
//             '1/2 tablete de manteiga (não use margarina)',
//             '1 colher (sopa) de azeite extra virgem',
//             'ervas (manjericão, orégano, salsa, cebolinha, tomilho, a gosto)',
//             'sal',
//             '1 dente de alho',
//             'gengibre em pó a gosto',
//             '1 folha de louro'
//           ],
//           preparation: [
//             'Quando faltar mais ou menos 5 minutos para ficar no ponto de escorrer o macarrão, comece o preparo da receita.',
//             'Na frigideira quente coloque a manteiga, o azeite, a folha de louro, e o alho granulado.',
//             'Nesta hora um pouco de agilidade, pois o macarrão escorrido vai para a frigideira, sendo mexido e dosado com sal a gosto, as ervas, o gengibre em pó a gosto também.',
//             'O dente de alho, serve para você untar os pratos onde serão servidos o macarrão.',
//             'Coloque as porções nos pratos já com o cheiro do alho, e enfeite com algumas ervas.'
//           ],
//           information: 'Não lave o macarrão nem passe óleo ou gordura nele depois de escorrê-lo. Coloque direto na frigideira.'
//     })

//     recipes.push({
//         title: 'Docinhos pão-do-céu',
//         chef_id: 6,
//         user_id:"",
//         ingredients: [
//             '1 kg de batata-doce',
//             '100 g de manteiga',
//             '3 ovos',
//             '1 pacote de coco seco ralado (100 g)',
//             '3 colheres (sopa) de açúcar 1 lata de Leite Moça',
//             '1 colher (sopa) de fermento em pó',
//             'manteiga para untar',
//             'açúcar de confeiteiro'
//           ],
//           preparation: [
//             'Cozinhe a batata-doce numa panela de pressão, com meio litro de água, por cerca de 20 minutos. Descasque e passe pelo espremedor, ainda quente.',
//             'Junte a manteiga, os ovos, o coco ralado, o açúcar, o Leite Moça e o fermento em pó, mexendo bem após cada adição.',
//             'Despeje em assadeira retangular média, untada e leve ao forno médio (180°C), por aproximadamente 45 minutos. Depois de frio, polvilhe, com o açúcar de confeiteiro e corte em quadrados.'
//           ],
//           information: 'Servir gelado'
//     })

//     const recipesPromise = recipes.map(recipe => Recipe.create(recipe))

//     recipeIds = await Promise.all(recipesPromise)
// }

createUsers()
createFiles()
createChefs()
//createFilesrecipes()
//createRecipes()

