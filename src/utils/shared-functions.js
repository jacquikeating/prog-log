export function createReadableDate(date) {
  const dateWithTime = date + "T17:00:00Z"; // 9 PM in UTC
  const readableDate = new Date(dateWithTime).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const suffix = numSuffix(readableDate);
  const dateWithSuffix = `${readableDate}${suffix}`;
  return dateWithSuffix;
}

export function numSuffix(number) {
  const lastNumeral = number.slice(-1);
  const last2Numerals = number.slice(-2);
  if (lastNumeral == 1 && last2Numerals != 11) {
    return "st";
  } else if (lastNumeral == 2 && last2Numerals != 12) {
    return "nd";
  } else if (lastNumeral == 3 && last2Numerals != 13) {
    return "rd";
  } else {
    return "th";
  }
}

export const findStrugglePhase = (pullsArray) => {
  const tallyObject = pullsArray.reduce((accumulatedObject, thisPull) => {
    accumulatedObject[thisPull.phase] =
      (accumulatedObject[thisPull.phase] ?? 0) + 1;
    return accumulatedObject;
  }, {});

  const tallyArray = Object.entries(tallyObject);

  const highestCount = tallyArray.reduce(
    (currentHighest, thisItem) => {
      if (thisItem[1] >= currentHighest[1]) {
        return thisItem;
      } else {
        return currentHighest;
      }
    },
    [null, 0]
  );
  return `${highestCount[0]} (${highestCount[1]} wipes)`;
};

export const findStruggleMech = (pullsArray) => {
  const noClearPulls = pullsArray.filter((pull) => {
    return pull.mech !== "Clear";
  });

  const tallyObject = noClearPulls.reduce((accumulatedObject, thisPull) => {
    accumulatedObject[thisPull.mech] =
      (accumulatedObject[thisPull.mech] ?? 0) + 1;
    return accumulatedObject;
  }, {});

  const tallyArray = Object.entries(tallyObject);

  const highestCount = tallyArray.reduce(
    (currentHighest, thisItem) => {
      if (thisItem[1] >= currentHighest[1]) {
        return thisItem;
      } else {
        return currentHighest;
      }
    },
    [null, 0]
  );
  return `${highestCount[0]} (${highestCount[1]} wipes)`;
};

export function findGoldStars(pullsArray, playersArray) {
  const rosterArray = playersArray.split(", ");
  let causedWipes = [];
  let goldStars = [];

  pullsArray.map((pull) => {
    if (pull.players_responsible) {
      const prArray = pull.players_responsible.split(", ");
      prArray.forEach((playerName) => {
        if (!causedWipes.includes(playerName)) {
          causedWipes.push(playerName);
        }
      });
    }
  });

  rosterArray.forEach((player) => {
    if (!causedWipes.includes(player)) {
      goldStars.push(player);
    }
  });

  if (goldStars.length === 0) {
    return "None";
  }

  goldStars = goldStars.join(", ");
  return goldStars;
}

export function getTextColour(progPoint, phase) {
  let targetMech = progPoint;
  let cleanupMech = progPoint - 1;

  if (phase > 0) {
    if (phase < cleanupMech) {
      return "old";
    } else if (phase == cleanupMech) {
      return "cleanup";
    } else if (phase == targetMech) {
      return "target";
    } else if (phase > targetMech) {
      return "newphase";
    } else {
      return "null";
    }
  }
}

export function checkIfProgPointReached(progPhase, wipePhase) {
  let cleanupPhase = progPhase - 1;

  if (wipePhase < cleanupPhase) {
    return "old";
  } else if (wipePhase == cleanupPhase) {
    return "cleanup";
  } else if (wipePhase == progPhase) {
    return "target";
  } else if (wipePhase > progPhase) {
    return "newphase";
  } else {
    return null;
  }
}

export function checkIfEmptyLink(link) {
  if (!link) {
    return "empty-link";
  }
}

export function getMechAfterProgMech(progMech) {
  const mechsList = [
    "P1 Opener",
    "Utopian Sky",
    "Fall of Faith",
    "Towers",
    "P1 Enrage",
    "Diamond Dust",
    "Mirrors",
    "Light Rampant",
    "P2 Enrage",
    "Intermission",
    "Ultimate Relativity",
    "Apocalypse",
    "P3 Enrage",
    "Darklit Dragonsong",
    "Crystallize Time",
    "P4 Enrage",
    "Fulgent Blade",
    "Paradise Regained",
    "Polarizing Strikes",
    "P5 Enrage",
  ];
  const progMechIndex = mechsList.indexOf(progMech);
  return mechsList[progMechIndex + 1];
}

export function convertMSToMinSec(ms) {
  const date = new Date(ms);
  const mins = date.getMinutes();
  let secs = date.getSeconds().toString();
  if (secs.length == 1) {
    secs = "0" + secs;
  }
  return `${mins}:${secs}`;
}

export function getPullsAtProgPoint(pulls, lastSession) {
  return pulls.filter((pull) => pull.mech == lastSession.prog_mech).length;
}

export function getClearsNum(pulls) {
  return pulls.filter((pull) => pull.mech == "Clear").length;
}