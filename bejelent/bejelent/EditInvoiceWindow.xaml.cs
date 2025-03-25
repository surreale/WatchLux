using System;
using System.Data;
using System.Windows;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class EditInvoiceWindow : Window
    {
        private readonly string connectionString = "server=localhost;user=root;password=root;database=ora;";
        private int szamlaAz;

        public EditInvoiceWindow(int selectedSzamlaAz)
        {
            InitializeComponent();
            szamlaAz = selectedSzamlaAz;
            LoadInvoiceData();
            LoadPaymentMethods();
        }

        private int fizetesiModAzErtek = 0; // Globális változó a fizetési mód tárolására

        private void LoadInvoiceData()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = @"
                 SELECT s.szamlaaz, v.nev AS vasarlo_nev, v.tel, v.email, 
                        sz.nev AS szallitas_nev, sz.cim, sz.varos, sz.iranyszam,
                        m.oraaz, o.megnevezes AS oranev, m.db, s.fizetesmodaz, f.fizetesmod, s.datum, s.adoszam
                 FROM szamla s
                 JOIN vasarlo v ON s.vasarloaz = v.vasarloaz
                 JOIN szallitassz sz ON s.szallitasaz = sz.szallitasaz
                 JOIN megrendeles m ON s.szamlaaz = m.szamlaaz
                 JOIN ora o ON m.oraaz = o.oraaz
                 JOIN fizetesmod f ON s.fizetesmodaz = f.fizetesmodaz
                 WHERE s.szamlaaz = @szamlaaz";

                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@szamlaaz", szamlaAz);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            SzamlaAzonositoTextBox.Text = reader["szamlaaz"].ToString();
                            VasarloNevTextBox.Text = reader["vasarlo_nev"].ToString();
                            TelefonTextBox.Text = reader["tel"].ToString();
                            EmailTextBox.Text = reader["email"].ToString();
                            SzallitasNevTextBox.Text = reader["szallitas_nev"].ToString();
                            CimTextBox.Text = reader["cim"].ToString();
                            VarosTextBox.Text = reader["varos"].ToString();
                            IranyitoszamTextBox.Text = reader["iranyszam"].ToString();
                            OraAzonositoTextBox.Text = reader["oraaz"].ToString();
                            OraNevTextBox.Text = reader["oranev"].ToString();
                            DbTextBox.Text = reader["db"].ToString();
                            DatumPicker.SelectedDate = Convert.ToDateTime(reader["datum"]);
                            AdoszamTextBox.Text = reader["adoszam"] != DBNull.Value ? reader["adoszam"].ToString() : "";

                            // 🔥 Fizetési mód azonosító mentése
                            fizetesiModAzErtek = Convert.ToInt32(reader["fizetesmodaz"]);
                        }
                    }
                }

                // Hívjuk meg a fizetési módok betöltését!
                LoadPaymentMethods();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a számla betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }



        private void LoadPaymentMethods()
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT fizetesmodaz, fizetesmod FROM fizetesmod";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    MySqlDataAdapter adapter = new MySqlDataAdapter(command);
                    DataTable dataTable = new DataTable();
                    adapter.Fill(dataTable);

                    FizetesiModComboBox.ItemsSource = dataTable.DefaultView;
                    FizetesiModComboBox.DisplayMemberPath = "fizetesmod";  // Megjelenített érték
                    FizetesiModComboBox.SelectedValuePath = "fizetesmodaz"; // Kiválasztott érték

                    // Ha már betöltöttük a számlát, állítsuk be az értéket!
                    if (FizetesiModComboBox.Items.Count > 0 && fizetesiModAzErtek > 0)
                    {
                        FizetesiModComboBox.SelectedValue = fizetesiModAzErtek;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a fizetési módok betöltésekor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }



        private void SaveInvoiceChangesButton_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    MySqlTransaction transaction = connection.BeginTransaction();

                    string updateSzamlaQuery = @"
                        UPDATE szamla
                        SET vasarloaz = (SELECT vasarloaz FROM vasarlo WHERE nev = @vasarloNev LIMIT 1),
                            szallitasaz = (SELECT szallitasaz FROM szallitassz WHERE nev = @szallitasNev LIMIT 1),
                            fizetesmodaz = @fizetesmodaz,
                            datum = @datum,
                            adoszam = @adoszam
                        WHERE szamlaaz = @szamlaaz";

                    MySqlCommand szamlaCommand = new MySqlCommand(updateSzamlaQuery, connection, transaction);
                    szamlaCommand.Parameters.AddWithValue("@szamlaaz", szamlaAz);
                    szamlaCommand.Parameters.AddWithValue("@vasarloNev", VasarloNevTextBox.Text);
                    szamlaCommand.Parameters.AddWithValue("@szallitasNev", SzallitasNevTextBox.Text);
                    szamlaCommand.Parameters.AddWithValue("@fizetesmodaz", FizetesiModComboBox.SelectedValue);
                    szamlaCommand.Parameters.AddWithValue("@datum", DatumPicker.SelectedDate);
                    szamlaCommand.Parameters.AddWithValue("@adoszam", string.IsNullOrEmpty(AdoszamTextBox.Text) ? DBNull.Value : (object)AdoszamTextBox.Text);
                    szamlaCommand.ExecuteNonQuery();

                    string updateMegrendelesQuery = @"
                        UPDATE megrendeles
                        SET oraaz = @oraaz,
                            db = @db
                        WHERE szamlaaz = @szamlaaz";

                    MySqlCommand megrendelesCommand = new MySqlCommand(updateMegrendelesQuery, connection, transaction);
                    megrendelesCommand.Parameters.AddWithValue("@szamlaaz", szamlaAz);
                    megrendelesCommand.Parameters.AddWithValue("@oraaz", OraAzonositoTextBox.Text);
                    megrendelesCommand.Parameters.AddWithValue("@db", DbTextBox.Text);
                    megrendelesCommand.ExecuteNonQuery();

                    transaction.Commit();
                    MessageBox.Show("A számla sikeresen módosítva!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                    this.Close();
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba a számla módosításakor: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }


        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}