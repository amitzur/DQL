describe("DQL specs", function() {

    jasmine.getFixtures().fixturesPath = "spec/fixtures";
    jasmine.getJSONFixtures().fixturesPath = "spec/fixtures";
    jasmine.getStyleFixtures().fixturesPath = "spec/fixtures";

    beforeEach(function() {
        loadFixtures('levels.html');
    });


    it("simple", function() {
        var simple = getJSONFixture("simple.json");
        var dql = new DQL(simple);

        for (var p in simple) {
            expect(dql[p].selector).toEqual(simple[p]);
            expect(dql[p].variables).toEqual([]);
            expect($(dql[p]())).toHaveLength(1);
        }

    });

    it("simple with vars", function() {
        var simpleWithVars = getJSONFixture("simpleWithVars.json");
        var dql = new DQL(simpleWithVars);

        expect(dql.simple5.selector).toEqual(simpleWithVars.simple5);
        expect(dql.simple5.variables).toEqual(["id"]);

        expect(dql.simple6.selector).toEqual(simpleWithVars.simple6);
        expect(dql.simple6.variables).toEqual(["className"]);

        expect(dql.simple7.selector).toEqual(simpleWithVars.simple7);
        expect(dql.simple7.variables).toEqual(["id", "className"]);

        var $simple5 = $(dql.simple5({ id: "aaa" }));
        expect($simple5).toHaveLength(1);

        var $simple6 = $(dql.simple6({ className: "ccc" }));
        expect($simple6).toHaveLength(1);

        var $simple7 = $(dql.simple6({ id: "bbb", className: "ccc" }));
        expect($simple7).toHaveLength(1);
    });

    it("level 2", function() {
        var complex = getJSONFixture("level2.json");
        var dql = new DQL(complex);

        expect(dql.level2.selector).toEqual(complex.level2.selector);
        expect(dql.level2.variables).toEqual([]);

        expect(dql.level2.level21.selector).toEqual(complex.level2.selector + " " + complex.level2.level21);
        expect(dql.level2.level21.variables).toEqual([]);

        expect(dql.level2a.selector).toEqual(complex.level2a.selector);
        expect(dql.level2a.variables).toEqual(["id"]);

        expect(dql.level2a.level2a1.selector).toEqual(complex.level2a.selector + " " + complex.level2a.level2a1);
        expect(dql.level2a.level2a1.variables).toEqual(["id", "className"]);


        var level2 = dql.level2();
        expect(level2).toHaveLength(1);

        var level21 = dql.level2.level21();
        expect(level21).toHaveLength(1);

        var level2a = dql.level2a({ id: "bbb" });
        expect(level2a).toHaveLength(1);

        var level2a1 = dql.level2a.level2a1({ id: "bbb", className: "ccc" });
        expect(level2a1).toHaveLength(1);


    });

    it("level 3", function() {
        var fixture = getJSONFixture("level3.json");
        var dql = new DQL(fixture);

        expect(dql.level3.selector).toEqual(fixture.level3.selector);
        expect(dql.level3.variables).toEqual(["id"]);

        expect(dql.level3.level31.selector).toEqual(fixture.level3.selector + " " + fixture.level3.level31.selector);
        expect(dql.level3.level31.variables).toEqual(["id", "className"]);

        expect(dql.level3.level31.level311.selector).toEqual(fixture.level3.selector + " " + fixture.level3.level31.selector + " " + fixture.level3.level31.level311);
        expect(dql.level3.level31.level311.variables).toEqual(["id", "className", "l3id"]);


        var level3 = dql.level3({ id: "ddd" });
        expect(level3).toHaveLength(1);

        var level31 = dql.level3.level31({ id: "ddd", className: "eee"});
        expect(level31).toHaveLength(1);

        var level311 = dql.level3.level31.level311({ id: "ddd", className: "eee", l3id: "fff" });
        expect(level311).toHaveLength(1);

        level311 = dql.level3.level31.level311({ context: level31, l3id: "fff" });
        expect(level311).toHaveLength(1);

    });
});