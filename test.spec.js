import { fireEvent, getByText, getByDisplayValue } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM, VirtualConsole, CookieJar } from 'jsdom'
// import { TestHelper } from './test-helpers.js'
import fs from 'fs'
import path from 'path'

//const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

const sum = require('./server/server/public/js/main.js');

let h
let dom
let container

describe('index.html', () => {
    beforeEach((done) => {
        // Constructing a new JSDOM with this option is the key
        // to getting the code in the script tag to execute.
        // This is indeed dangerous and should only be done with trusted content.
        // https://github.com/jsdom/jsdom#executing-scripts

        let options = {
            
            resources: 'usable',
            runScripts: 'dangerously'
        }

        // JSDOM.fromURL(url, options).then((dom) => {
        //     setTimeout(() => {
        //         container = dom.window.document.body
        //         h = new TestHelper(container)
        //         done();
        //     }, 500);
        // })

        done();
    })

    it('test', () => {
        expect(sum(2,4)).toBe(6)
    })
})