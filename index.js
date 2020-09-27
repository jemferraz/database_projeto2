const express = require('express');
const bodyParser = require('body-parser');
const client = require('./db/db');

const app = express();

app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ### Criação de rotas ### */

//Initalize variable that holds the list of occupations
let uniqueOccupations = [];
let listAllOccupations = [];

//GET data from database
app.get('/', (req, res) => {

  let queryStr = '';
  const occupation = req.query.occupation
  //console.log(occupation);

  if(occupation){
    //console.log(`Select by occupation: ${occupation}`)
    
    //Create query string to select rows by occupation
    queryStr = `SELECT * FROM person WHERE occupation = '${occupation}'`;
  }
  else{
    //Create query string to select current rows from database
    queryStr = 'SELECT * FROM person';
  }

  //Function to render home page
  const renderQuery = result => {
    //console.log(result.rows);

    //Get list of (unique) occupations
    //We could have used 'SELECT DISTINCT occupation FROM person' instead of the solution below, 
    //but that would have required another (unecessary) query in the database...
    listAllOccupations.push(...new Set(result.rows.map(row => row.occupation)));
    uniqueOccupations = [...new Set(listAllOccupations)];

    //console.log(uniqueOccupations);

    //Fill output object (for renderization of the page)
    const renderParam = { rows : result.rows, 
                          uniqueOccupations: uniqueOccupations };

    //Render page
    res.render('home', {renderParam});
  }

  // Query database 
  client.query(queryStr)
  .then(renderQuery)
  .catch(err => console.log(err));
})

//POST occupation and get corresponding rows
app.post('/filter_by_occupation', (req, res) => {
  const occupation = req.body.occupation;
  //console.log(`This is the occupation in the server side: ${occupation}`);

  //Create query string to select current rows from database
  if(occupation){
    const queryStr = `SELECT * FROM person WHERE occupation = '${occupation}'`;
    //console.log(queryStr);

    //Function to render home page
    const renderQueryFilter = (result) => {
      //Fill output object (for renderization of the page)
      const renderParam = { rows : result.rows, 
                            uniqueOccupations: uniqueOccupations };
      console.log(renderParam);
      
      //Render pag
      res.render('home', {renderParam});
    }
  
    // Query database 
    client.query(queryStr)
    .then(renderQueryFilter)
    .catch(err => console.log(err));  
  }
})

//GET empty form page
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});


//POST insert record
app.post('/cadastrar', (req, res) => {
  // Obtenha os dados do formulário de cadastro aqui utilizando o req.body
  const body = req.body;
  
  // DICA: utilize o console.log() para verificar se os dados estão sendo recebidos corretamente.
  console.log(body);

  //Create query to insert record
  const queryStr = 'INSERT INTO person(cpf, name, gender, birthdate, occupation) VALUES($1, $2, $3, $4, $5)';
  const values = [  body.cpf,
                    body.name,
                    body.gender,
                    body.date, 
                    body.occupation  ];

  //Insert record
  client.query(queryStr, values)
  .then(response => console.log(response.json))
  .catch(err => console.log(err));

  // Renderize a página inicial (home) com o cadastro incluso na tabela
  return res.redirect('/');
});


client.connect()
.then(() => {
    console.log('Established connection...');
})
.catch(err =>{
    console.log(`Error while connecting to the database: ${err}.\nServer is NOT running...`)
});

app.listen(3000, () => {
  console.log('Server running...');
});