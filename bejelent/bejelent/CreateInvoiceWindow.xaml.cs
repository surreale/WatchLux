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
                FizetesiModComboBox.Items.Clear(); // Töröljük a régi elemeket

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

                    if (FizetesiModComboBox.Items.Count > 0)
                        FizetesiModComboBox.SelectedIndex = 0; // Alapértelmezett elem kijelölése
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a fizetési módok betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void SaveInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            string szamlaAzonosito = SzamlaAzonositoTextBox.Text;
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
            string adoszam = AdoszamTextBox.Text; // opcionális

            // Ellenőrzések: csak számokat tartalmazhatnak
            if (!int.TryParse(SzamlaAzonositoTextBox.Text, out _))
            {
                MessageBox.Show("A számla azonosítónak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(IranyitoszamTextBox.Text, out _))
            {
                MessageBox.Show("Az irányítószámnak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(TelefonTextBox.Text, out _))
            {
                MessageBox.Show("A telefonszámnak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(OraAzonositoTextBox.Text, out _))
            {
                MessageBox.Show("Az óra azonosítónak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!int.TryParse(DbTextBox.Text, out int darabszam))
            {
                MessageBox.Show("A darabszámnak számnak kell lennie!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Nem kötelező mező: ha nem üres, akkor ellenőrizzük, hogy szám-e
            if (!string.IsNullOrWhiteSpace(adoszam) && !int.TryParse(adoszam, out _))
            {
                MessageBox.Show("Az adószámnak számnak kell lennie, ha meg van adva!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            // Ellenőrizni, hogy minden kötelező mező ki van-e töltve
            if (string.IsNullOrWhiteSpace(vasarloNev) || string.IsNullOrWhiteSpace(szallitasNev) ||
                string.IsNullOrWhiteSpace(cim) || string.IsNullOrWhiteSpace(varos) ||
                string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(telefon) ||
                string.IsNullOrWhiteSpace(oraAzonosito) || string.IsNullOrWhiteSpace(oraNev) ||
                string.IsNullOrWhiteSpace(fizetesiModNev) || string.IsNullOrWhiteSpace(datum))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni (kivéve az adószámot)!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
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
                            new MySqlParameter("@iranyszam", int.Parse(IranyitoszamTextBox.Text)),
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
                            new MySqlParameter("@adoszam", string.IsNullOrWhiteSpace(adoszam) ? (object)DBNull.Value : adoszam),
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
