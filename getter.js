const neo4j = require('neo4j-driver');


const uri='neo4j+s://47f703f8.databases.neo4j.io:7687';
const username='neo4j';
const password='pr38sFoggIWNfpXCPZ5d_w4B57VzVqRqMjhMriiYlJ0';

//Creating a neo4j driver to connect to the Aura DB
const driver= neo4j.driver(
    uri,neo4j.auth.basic('neo4j','pr38sFoggIWNfpXCPZ5d_w4B57VzVqRqMjhMriiYlJ0')
);

async function runQuery(session) {
    const result = await session.run(`
      MATCH (movie:Movie)-[:ACTED_IN]->(actor:Actor)
      RETURN movie.title AS movie, collect(actor.name) AS actors
    `);
  
    console.log('Movies and their actors:');
    result.records.forEach(record => {
      const movie = record.get('movie');
      const actors = record.get('actors');
      console.log(`${movie}: ${actors.join(', ')}`);
    });
  }
  
  (async () => {
    const session = driver.session();
    try {
      await runQuery(session);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      session.close();
      driver.close();
    }
  })();