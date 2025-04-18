// inserts dummy data into a specified database
async function insertDummyData(sequelize) {
    if (!sequelize) {
        console.log('seqeulize instance does not exist');
        return; 
    }

    try {
        await sequelize.models.User.bulkCreate([
          {id: '455840886956257287', username: 'Jeremy Elbertson'},
          {id: '161640664076316994', username: 'Otto'},
          {id: '997027454665226734', username: 'BallFondler'},
          {id: '667792375797365060', username: 'Among Us Guy'}
        ]);
      
        await sequelize.models.Guild.bulkCreate([
          {id: '827597916039016962'}
        ]);
      
        await sequelize.models.Score.bulkCreate([
          {GuildId: '827597916039016962', UserId: '455840886956257287', score: 985},
          {GuildId: '827597916039016962', UserId: '161640664076316994', score: 0},
          {GuildId: '827597916039016962', UserId: '997027454665226734', score: 12},
          {GuildId: '827597916039016962', UserId: '667792375797365060', score: 82},
        ]);
    } catch(err) {
        console.log('could not insert values into database', err);
    }  
    
}

module.exports = insertDummyData;
