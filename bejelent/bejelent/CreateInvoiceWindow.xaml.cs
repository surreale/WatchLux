using System;
using System.Windows;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class CreateInvoiceWindow : Window
    {
        private readonly string connectionString = "server=localhost;user=root;password=root;database=ora;";

        public CreateInvoiceWindow()
        {
            InitializeComponent();
            LoadPaymentMethods();
        }

        private void LoadPaymentMethods()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT fizetesmod FROM fizetesmod";
                    MySqlCommand cmd = new MySqlCommand(query, connection);
                    MySqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        FizetesiModComboBox.Items.Add(reader.GetString("fizetesmod"));
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a fizetési módok betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void SaveInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            string vasarloNev = VasarloNevTextBox.Text;
            string szallitasNev = SzallitasNevTextBox.Text;
            string cim = CimTextBox.Text;
            string varos = VarosTextBox.Text;
            string email = EmailTextBox.Text;
            string telefon = TelefonTextBox.Text;
            string oraAzonosito = OraAzonositoTextBox.Text;
            string oraNev = OraNevTextBox.Text;
            string fizetesiModNev = FizetesiModComboBox.Text;
            string datum = DatumPicker.SelectedDate.HasValue ? DatumPicker.SelectedDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : "";
            string adoszam = AdoszamTextBox.Text;

            int iranyitoszam;
            if (!int.TryParse(IranyitoszamTextBox.Text, out iranyitoszam))
            {
                MessageBox.Show("Az irányítószámnak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            int darabszam;
            if (!int.TryParse(DbTextBox.Text, out darabszam))
            {
                MessageBox.Show("A darabszámnak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (string.IsNullOrWhiteSpace(vasarloNev) || string.IsNullOrWhiteSpace(szallitasNev) ||
                string.IsNullOrWhiteSpace(cim) || string.IsNullOrWhiteSpace(varos) ||
                string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(telefon) ||
                string.IsNullOrWhiteSpace(oraAzonosito) || string.IsNullOrWhiteSpace(oraNev) ||
                string.IsNullOrWhiteSpace(fizetesiModNev) || string.IsNullOrWhiteSpace(datum) ||
                string.IsNullOrWhiteSpace(adoszam))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlTransaction transaction = connection.BeginTransaction();

                    try
                    {
                        int szallitasId = InsertOrGetId(connection, transaction, "szallitassz", "szallitasaz",
                            "nev, cim, iranyszam, varos", "@nev, @cim, @iranyszam, @varos",
                            new MySqlParameter("@nev", szallitasNev),
                            new MySqlParameter("@cim", cim),
                            new MySqlParameter("@iranyszam", iranyitoszam),
                            new MySqlParameter("@varos", varos));

                        int vasarloId = InsertOrGetId(connection, transaction, "vasarlo", "vasarloaz",
                            "nev, tel, email", "@nev, @tel, @email",
                            new MySqlParameter("@nev", vasarloNev),
                            new MySqlParameter("@tel", telefon),
                            new MySqlParameter("@email", email));

                        int fizetesModId = GetIdByName(connection, transaction, "fizetesmod", "fizetesmodaz", "fizetesmod", fizetesiModNev);
                        if (fizetesModId == -1)
                        {
                            throw new Exception("Érvénytelen fizetési mód!");
                        }

                        int szamlaId = InsertOrGetId(connection, transaction, "szamla", "szamlaaz",
                            "vasarloaz, fizetesmodaz, szallitasaz, adoszam, datum",
                            "@vasarloaz, @fizetesmodaz, @szallitasaz, @adoszam, @datum",
                            new MySqlParameter("@vasarloaz", vasarloId),
                            new MySqlParameter("@fizetesmodaz", fizetesModId),
                            new MySqlParameter("@szallitasaz", szallitasId),
                            new MySqlParameter("@adoszam", adoszam),
                            new MySqlParameter("@datum", datum));

                        InsertIntoTable(connection, transaction, "megrendeles",
                            "oraaz, szamlaaz, db",
                            "@oraaz, @szamlaaz, @db",
                            new MySqlParameter("@oraaz", oraAzonosito),
                            new MySqlParameter("@szamlaaz", szamlaId),
                            new MySqlParameter("@db", darabszam));

                        transaction.Commit();
                        MessageBox.Show("Számla és rendelés sikeresen létrehozva!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                        this.Close();
                    }
                    catch (Exception ex)
                    {
                        transaction.Rollback();
                        MessageBox.Show($"Hiba történt a mentés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba az adatbázis kapcsolatnál:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private int InsertOrGetId(MySqlConnection conn, MySqlTransaction trans, string table, string primaryKey, string columns, string values, params MySqlParameter[] parameters)
        {
            string query = $"INSERT INTO {table} ({columns}) VALUES ({values}) ON DUPLICATE KEY UPDATE {primaryKey}=LAST_INSERT_ID({primaryKey})";
            using (MySqlCommand cmd = new MySqlCommand(query, conn, trans))
            {
                cmd.Parameters.AddRange(parameters);
                cmd.ExecuteNonQuery();
                return (int)cmd.LastInsertedId;
            }
        }

        private void InsertIntoTable(MySqlConnection conn, MySqlTransaction trans, string table, string columns, string values, params MySqlParameter[] parameters)
        {
            string query = $"INSERT INTO {table} ({columns}) VALUES ({values})";
            using (MySqlCommand cmd = new MySqlCommand(query, conn, trans))
            {
                cmd.Parameters.AddRange(parameters);
                cmd.ExecuteNonQuery();
            }
        }

        private int GetIdByName(MySqlConnection conn, MySqlTransaction trans, string table, string idColumn, string nameColumn, string name)
        {
            string query = $"SELECT {idColumn} FROM {table} WHERE {nameColumn} = @name";
            using (MySqlCommand cmd = new MySqlCommand(query, conn, trans))
            {
                cmd.Parameters.AddWithValue("@name", name);
                object result = cmd.ExecuteScalar();
                return result != null ? Convert.ToInt32(result) : -1;
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
