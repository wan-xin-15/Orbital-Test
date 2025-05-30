import pool from "../config/db";

class CafeModel {
  async createCafe(cafeName: string, cafeLocation: string) {
    const [rows] = await pool.query(
      "INSERT INTO cafes (cafeName, cafeLocation) VALUES (?,?)",
      [cafeName, cafeLocation]
    );
    return rows;
  }

  async getAllCafes() {
    const [rows] = await pool.query("SELECT * FROM cafes");
    return rows;
  }

  async getCafeById(id: number) {
    const [rows] = await pool.query("SELECT * FROM cafes WHERE id = ?", [id]);
    return rows;
  }

  async updateCafeById(id: number, cafeName: string, cafeLocation: string) {
    const [rows] = await pool.query(
      "UPDATE cafes SET cafeName = ?, cafeLocation = ? WHERE id = ?",
      [cafeName, cafeLocation, id]
    );
    return rows;
  }

  async deleteCafeById(id: number) {
    const [rows] = await pool.query("DELETE FROM cafes WHERE id = ?", [id]);
    return rows;
  }
}

export default new CafeModel();
