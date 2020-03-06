/*  07/08/19
    Attribution to the following reference sites:
    https://jasmine.github.io/api/edge/matchers - for learning further match methods.
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click - for learning to simulate a mouse click event.
*/

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the feedreader application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, in the allFeeds variable within the app.js file.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls defined and not empty', function() {
          for (const feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          };
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names defined and not empty', function() {
          for (const feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          };
        });
    });

    /* Test suite named "The menu" */
    describe('The Menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        const body = document.querySelector('body');
        const menuState = body.classList;
        const menuButton = document.querySelector('.menu-icon-link');

        it('check menu is hidden on page load', function() {
          expect(menuState).toContain('menu-hidden');
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu should toggle when clicked', function() {
          menuButton.click();
          expect(menuState).not.toContain('menu-hidden');
          menuButton.click();
          expect(menuState).toContain('menu-hidden');
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * loadFeed() is asynchronous, so this test requires
        * the use of Jasmine's beforeEach and asynchronous done() function
        */
        beforeEach(function(done) {
          loadFeed(0, function() {
            done();
          });
        });

        it('check at least one entry element exists in the feed container', function(done) {
          const feedEntry = document.querySelector('.feed .entry');
          expect(feedEntry).not.toEqual(null);
          done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        let content1Feed1 = '';
        let content1Feed2 = '';
        /* This test ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * loadFeed() is asynchronous, so this test requires
        * the use of Jasmine's beforeEach and asynchronous done() function
        */
        beforeEach(function(done) {
          loadFeed(0, function() {
            const entry1Feed1 = document.querySelector('.entry');
            content1Feed1 = entry1Feed1.textContent;
            done();
          });
        });

        beforeEach(function(done) {
          loadFeed(1, function() {
            const entry1Feed2 = document.querySelector('.entry');
            content1Feed2 = entry1Feed2.textContent;
            done();
          });
        });

        it('check that the content changes when a new feed is loaded', function() {
          expect(content1Feed1).not.toEqual(content1Feed2);
        });
    });
}());
