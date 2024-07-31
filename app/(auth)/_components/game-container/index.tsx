"use client";

import { useScreenSize } from "@/contexts/screen-size-context";
import { newGame } from "@/lib/auth/game/game";
import { Game } from "phaser";
import { useEffect, useRef } from "react";

export function GameContainer() {
  const gameRef = useRef<Game | null>(null);

  const screenSize = useScreenSize();

  useEffect(() => {
    if (!gameRef.current && screenSize) {
      gameRef.current = newGame("game-container", {
        aspectRatio: screenSize.width / screenSize.height,
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);

        gameRef.current = null;
      }
    };
  }, [screenSize]);

  return (
    <div id="game-container" />
  );
}

export default GameContainer;
