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
        }

        private void SaveInvoiceButton_Click(object sender, RoutedEventArgs e)
        {
            string vasarloNev = VasarloNevTextBox.Text;
            string szallitasNev = SzallitasNevTextBox.Text;
            string cim = CimTextBox.Text;
            string varos = VarosTextBox.Text;
            string iranyitoszam = IranyitoszamTextBox.Text;
            string email = EmailTextBox.Text;
            string telefon = TelefonTextBox.Text;
            string oraNev = OraNevTextBox.Text;
            string fizetesiMod = FizetesiModComboBox.Text;
            string datum = DatumPicker.SelectedDate.HasValue ? DatumPicker.SelectedDate.Value.ToString("yyyy-MM-dd") : "";
            string adoszam = AdoszamTextBox.Text;

            if (string.IsNullOrWhiteSpace(vasarloNev) || string.IsNullOrWhiteSpace(cim) ||
                string.IsNullOrWhiteSpace(varos) || string.IsNullOrWhiteSpace(iranyitoszam) ||
                string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(telefon) ||
                string.IsNullOrWhiteSpace(oraNev) || string.IsNullOrWhiteSpace(fizetesiMod) ||
                string.IsNullOrWhiteSpace(datum) || string.IsNullOrWhiteSpace(adoszam))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string insertQuery = "INSERT INTO szamla (vasarlonev, szallitasnev, cim, varos, iranyitoszam, email, tel, oranev, fizetesmod, datum, adoszam) " +
                                         "VALUES (@vasarlonev, @szallitasnev, @cim, @varos, @iranyitoszam, @email, @tel, @oranev, @fizetesmod, @datum, @adoszam)";

                    MySqlCommand command = new MySqlCommand(insertQuery, connection);
                    command.Parameters.AddWithValue("@vasarlonev", vasarloNev);
                    command.Parameters.AddWithValue("@szallitasnev", szallitasNev);
                    command.Parameters.AddWithValue("@cim", cim);
                    command.Parameters.AddWithValue("@varos", varos);
                    command.Parameters.AddWithValue("@iranyitoszam", iranyitoszam);
                    command.Parameters.AddWithValue("@email", email);
                    command.Parameters.AddWithValue("@tel", telefon);
                    command.Parameters.AddWithValue("@oranev", oraNev);
                    command.Parameters.AddWithValue("@fizetesmod", fizetesiMod);
                    command.Parameters.AddWithValue("@datum", datum);
                    command.Parameters.AddWithValue("@adoszam", adoszam);

                    command.ExecuteNonQuery();
                }

                MessageBox.Show("Számla sikeresen létrehozva!", "Siker", MessageBoxButton.OK, MessageBoxImage.Information);
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt a mentés során:\n{ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
