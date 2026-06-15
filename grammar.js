export default grammar({
  name: "peeper_lockfile",

  extras: ($) => [/\s/],

  rules: {
    source_file: ($) => $.object,

    object: ($) =>
      seq(
        "{",
        optional(seq(
          $.pair,
          repeat(seq(",", $.pair)),
          optional(","),
        )),
        "}",
      ),

    pair: ($) =>
      seq(
        field("key", $.string),
        ":",
        field("value", choice(
          $.object,
          $.array,
          $.string,
          $.number,
          $.boolean,
          $.null,
        )),
      ),

    array: ($) =>
      seq(
        "[",
        optional(seq(
          choice(
            $.object,
            $.string,
            $.number,
            $.boolean,
          ),
          repeat(seq(",", choice(
            $.object,
            $.string,
            $.number,
            $.boolean,
          ))),
          optional(","),
        )),
        "]",
      ),

    string: ($) =>
      token(seq('"', repeat(choice(
        seq('\\', /./),
        /[^"\\]/
      )), '"')),

    number: ($) =>
      token(/[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/),

    boolean: ($) => choice("true", "false"),

    null: ($) => "null",
  },
});
