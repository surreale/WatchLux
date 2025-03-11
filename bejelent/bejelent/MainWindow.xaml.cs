using System;
using System.Security.Cryptography;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace BejelentkezesApp
{
    public partial class MainWindow : Window
    {
        private string connectionString = "server=localhost;database=ora;user=root;password=root;";

        public MainWindow()
        {
            InitializeComponent();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text.Trim();
            string password = PasswordBox.Password.Trim();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Kérlek, töltsd ki az összes mezőt!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            string hashedPassword = ComputeSha256Hash(password);

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT jogosultsag FROM felhasznalok WHERE felhasznalonev = @username AND jelszo = @password";
                    MySqlCommand command = new MySqlCommand(query, connection);
                    command.Parameters.AddWithValue("@username", username);
                    command.Parameters.AddWithValue("@password", hashedPassword);

                    object result = command.ExecuteScalar();
                    if (result != null)
                    {
                        string jogosultsag = result.ToString();
                        MessageBox.Show("Sikeres bejelentkezés!", "Üzenet", MessageBoxButton.OK, MessageBoxImage.Information);
                        Admin adminWindow = new Admin(jogosultsag);
                        adminWindow.Show();
                        this.Close();
                    }
                    else
                    {
                        MessageBox.Show("Helytelen felhasználónév vagy jelszó!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Hiba történt: {ex.Message}", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

       

    }
}
