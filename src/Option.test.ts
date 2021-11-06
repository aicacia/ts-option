import * as tape from "tape";
import { none, Option, some } from ".";

tape("Option", (assert: tape.Test) => {
  assert.equal(Option.some(1).isSome(), true);
  assert.equal(some(1).isNone(), false);
  assert.deepEqual(Option.fromJSON(1), some(1));

  assert.equal(Option.none().isSome(), false);
  assert.equal(none().isNone(), true);
  assert.deepEqual(Option.fromJSON(null), none());

  assert.equal(some(1).unwrap(), 1);
  assert.equal(
    some(1)
      .map((x) => x + 1)
      .unwrap(),
    2
  );
  assert.equal(
    some(1)
      .mapOr((x) => x + 1, 1)
      .unwrap(),
    2
  );
  assert.equal(
    none<number>()
      .mapOr((x) => x + 1, 1)
      .unwrap(),
    1
  );
  assert.equal(
    some(1)
      .mapOrElse(
        (x) => x + 1,
        () => 1
      )
      .unwrap(),
    2
  );
  assert.equal(
    none<number>()
      .mapOrElse(
        (x) => x + 1,
        () => 1
      )
      .unwrap(),
    1
  );
  assert.equal(
    none<number>()
      .map((x) => x + 1)
      .isNone(),
    true
  );

  assert.deepEqual(some(1).flatMap(some), some(1));
  assert.deepEqual(none<number>().flatMapOr(some, some(1)), some(1));
  assert.deepEqual(
    none<number>().flatMapOrElse(some, () => some(1)),
    some(1)
  );

  assert.deepEqual(some(1).and(some(2)), some(2));
  assert.deepEqual(none<number>().and(some(1)), none<number>());

  assert.deepEqual(
    some(1).andThen(() => some(2)),
    some(2)
  );
  assert.deepEqual(
    none().andThen(() => some(1)),
    none()
  );

  assert.deepEqual(some(1).or(some(2)), some(1));
  assert.deepEqual(none().or(some(1)), some(1));

  assert.deepEqual(
    some(1).orElse(() => some(2)),
    some(1)
  );
  assert.deepEqual(
    none().orElse(() => some(1)),
    some(1)
  );

  assert.deepEqual(some(1).xor(some(2)), none());
  assert.deepEqual(none().xor(some(2)), some(2));
  assert.deepEqual(some(1).xor(none()), some(1));

  assert.deepEqual(
    some(1).filter((x) => x === 1),
    some(1)
  );
  assert.deepEqual(
    some(2).filter((x) => x === 1),
    none()
  );
  assert.deepEqual(
    none().filter(() => true),
    none()
  );

  assert.equal(
    none().unwrapOrElse(() => 1),
    1
  );

  assert.deepEqual(some(2).getOrInsert(1), some(2));
  assert.deepEqual(none().getOrInsert(1), some(1));
  assert.deepEqual(
    some(2).getOrInsertWith(() => 1),
    some(2)
  );
  assert.deepEqual(
    none().getOrInsertWith(() => 1),
    some(1)
  );

  const someValue = some(1);
  assert.deepEqual(someValue.take(), some(1));
  assert.deepEqual(someValue, none());

  assert.deepEqual(some(1).from(1), some(1));
  assert.deepEqual(none().from(1), some(1));
  assert.deepEqual(some(1).from(null), none());
  assert.deepEqual(none().from(undefined), none());

  const noneValue = none();
  assert.deepEqual(noneValue.take(), none());
  assert.deepEqual(noneValue, none());

  assert.deepEqual(some(0).replace(1), some(1));
  assert.deepEqual(none().replace(1), some(1));

  assert.deepEqual(some({}).toJS(), {});
  assert.deepEqual(none().toJS(), null);
  assert.deepEqual(some({}).toJSON(), {});
  assert.deepEqual(none().toJSON(), null);

  let ifSomeValue = 0;
  some(1).ifSome((x) => (ifSomeValue = x));
  assert.equal(ifSomeValue, 1);

  let ifElseCalled = false;
  none().ifSome(
    () => undefined,
    () => (ifElseCalled = true)
  );
  assert.equal(ifElseCalled, true);

  let ifNoneCalled = false;
  none().ifNone(() => (ifNoneCalled = true));
  assert.equal(ifNoneCalled, true);

  let ifNoneElseValue = 0;
  some(1).ifNone(
    () => undefined,
    (x) => (ifNoneElseValue = x)
  );
  assert.equal(ifNoneElseValue, 1);

  assert.throws(() => {
    none().unwrap();
  }, /Tried to unwrap value of none Option/);

  assert.throws(
    () => new Option({}, {}),
    /Options can only be created with the some or none functions/
  );

  assert.end();
});
