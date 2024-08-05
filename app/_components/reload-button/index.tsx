"use client";

import { useCallback } from "react";

export function ReloadButton() {
  const click = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <button
      onClick={click}
      className="px-4 py-2 border rounded">
      再読み込み
    </button>
  );
}
