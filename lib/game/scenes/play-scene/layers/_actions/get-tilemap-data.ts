"use server";

export async function getTilemapData(): Promise<number[][]> {
  try {
    return Array.from({ length: 10 }).map(() => {
      return Array.from({ length: 10 }).map(() => {
        return 3;
      });
    });
  } catch (err) {
    alert(JSON.stringify(err, null, "  "));

    return [];
  }
}
