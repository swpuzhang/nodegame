var channel = module.parent.exports.channel;
var node = module.parent.exports.node;
var Database = require('nodegame-db').Database;
var ngdb = new Database(node);
var mdb = ngdb.getLayer('MongoDB');

// TODO: this does not work with channel.require ??
//var Stager = module.parent.exports.Stager;
//var stepRules = module.parent.exports.stepRules;

var ngc = require('nodegame-client');
var Stager = ngc.Stager;
var stepRules = ngc.stepRules;

var stager = new Stager();

var counter = 0;

/**
 * This is a game that spawns sub-games
 *
 */
module.exports = function(node, channel) {

    //var ff = require('./facefactory.js')


    //The stages / steps of the logic are defined here
    // but could be loaded from the database

    stager.setOnInit(function() {
        // nothing
        console.log('init');
    });

    stager.addStage({
        id: 'pairs',
        cb: function() {
            console.log('********************** pairs stage ' + counter++ + ' **********************');
            
            node.on.data(function(msg) {
                if (msg.text !== 'NEXT') return;
                console.log('*************************');
                console.log('Received next', msg.data);
                console.log('*************************');
            });

            node.on('in.set.DATA', function(msg) {
                // console.log('in.set.DATA received: memory size = ', node.game.memory.size());
            });

            node.on('EVA', function(msg) {
                // Saving the evaluation.
                db.store(msg);
            });
            
        }
    });


    stager.init().next('pairs');

    return {
        nodename: 'lgc' + counter,
        game_metadata: {
            name: 'pairs',
            version: '0.0.1'
        },
        game_settings: {
            publishLevel: 0
        },
        plot: stager.getState(),
        debug: true,
        verbosity: 0
    };

};
