using MySql.Data.MySqlClient;
using System.Data;
using System.Windows;

namespace BejelentkezesApp
{
    public class Data
    {
        private string connectionString = "server=localhost;database=ora;user=root;password=root;";

        public void ExecuteQuery(string query)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
