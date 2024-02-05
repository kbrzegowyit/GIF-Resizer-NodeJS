import ArgsParser from '../args-parser.js';
import assert from 'node:assert/strict';

describe('ArgParser', () => {
    it('should parse the arguments', () => {
        const args = ['node', 'script.js', 'input.gif', 'output.gif', '100'];
        
        const parsedArgs = ArgsParser(args);
        
        assert.deepStrictEqual(parsedArgs, {
            inputPath: 'input.gif',
            outputPath: 'output.gif',
            scaleFactor: 100
        });
    });

    it('should throw an error if not enough arguments are provided', () => {
        const args = ['node', 'script.js', 'input.gif', 'output.gif'];
        
        assert.throws(() => {
            ArgsParser(args);
        }, {
            name: 'Error',
            message: 'Not enough arguments'
        });
    });

    it('should throw an error if the scale factor is not a number', () => {
        const args = ['node', 'script.js', 'input.gif', 'output.gif', 'abc'];
        
        assert.throws(() => {
            ArgsParser(args);
        }, {
            name: 'Error',
            message: 'Scale factor must be a number'
        });
    });
});
