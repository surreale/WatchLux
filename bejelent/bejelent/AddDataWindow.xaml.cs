using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Security.Cryptography;


namespace BejelentkezesApp
{
    public partial class AddDataWindow : Window
    {
        public Dictionary<string, object> NewData { get; private set; }
        private readonly DataColumnCollection columns;
        private readonly string currentTableName;


        private readonly Dictionary<string, string> columnHeaderMapping = new()
        {
            { "id", "Felhasználó azonosító:" },
            { "nev", "Név:" },
            { "felhasznalonev", "Felhasználónév:" },
            { "jelszo", "Jelszó (elég a szöveget beírni, a rendszer mentés után TITKOSÍT):" },
            { "jogosultsag", "Jogosultság:" },
            { "vasarloaz", "Vásárló azonosító:" },
            { "vnev", "Vásárló Neve:" },
            { "tel", "Telefonszám:" },
            { "email", "Email:" },
            { "szallitasaz", "Szállítás azonosító:" },
            { "sznev", "Szállítási Név:" },
            { "cim", "Cím:" },
            { "iranyszam", "Irányítószám:" },
            { "varos", "Város:" },
            { "szamlaaz", "Számla azonosító:" },
            { "datum", "Dátum:" },
            { "adoszam", "Adószám:" },
            { "oraaz", "Óra azonosító:" },
            { "oranev", "Óra neve:" },
            { "db", "Darabszám:" },
            { "ar", "Ár:" },
            { "cikkszam", "Cikkszám:" },
            { "megnevezes", "Megnevezés:" },
            { "tipus", "Típus:" },
            { "marka", "Márka:" },
            { "jotallas", "Jótállás:" },
            { "szij", "Szíj:" },
            { "szijszine", "Szíj színe:" },
            { "atok", "Tok:" },
            { "atokszine", "Tok színe:" },
            { "szamlaptipus", "Számlap típus:" },
            { "szamlapszine", "Számlap színe:" },
            { "meretmillimeterben", "Méret (mm):" },
            { "sulygrammban", "Súly (g):" },
            { "vizallosag", "Vízállóság:" },
            { "meghajtas", "Meghajtás:" },
            { "kristalyuveg", "Üveg típusa:" },
            { "datumkijelzes", "Dátumkijelzés:" },
            { "extrafunkcio", "Extrafunkció:" },
            { "raktar", "Raktár:" },
            { "oraforma", "Óraforma:" },
            { "nem", "Nem:" },
            { "maxcsuklomili", "Max. csukló méret (mm):" },
            { "fizetesmod", "Fizetési mód:" }
        };

        public AddDataWindow(DataColumnCollection columnDefinitions)
        {
            InitializeComponent();
            columns = columnDefinitions;
            GenerateForm();
        }

        public AddDataWindow(DataColumnCollection columnDefinitions, string tableName)
        {
            InitializeComponent();
            columns = columnDefinitions;
            currentTableName = tableName.ToLower();
            GenerateForm();
        }

        private void GenerateForm()
        {
            foreach (DataColumn column in columns)
            {
                string name = column.ColumnName.ToLower();

                if (column.AutoIncrement || name.EndsWith("az") || name == "id")
                    continue;

                StackPanel row = new StackPanel
                {
                    Orientation = Orientation.Vertical,
                    Margin = new Thickness(0, 5, 0, 5)
                };

                string labelText = columnHeaderMapping.TryGetValue(column.ColumnName, out string mappedLabel)
                    ? mappedLabel
                    : column.ColumnName;

                TextBlock label = new TextBlock
                {
                    Text = labelText,
                    Foreground = Brushes.White,
                    FontWeight = FontWeights.Bold
                };

                TextBox input = new TextBox
                {
                    Name = $"input_{column.ColumnName}",
                    Tag = column.ColumnName,
                    Background = new SolidColorBrush(Color.FromRgb(30, 30, 45)),
                    Foreground = Brushes.White,
                    BorderBrush = new SolidColorBrush(Color.FromRgb(76, 175, 80)),
                    Padding = new Thickness(5),
                    Margin = new Thickness(0, 5, 0, 10),
                    Width = 380
                };

                row.Children.Add(label);
                row.Children.Add(input);
                FormPanel.Children.Add(row);
            }
        }

        private void Save_Click(object sender, RoutedEventArgs e)
        {
            NewData = new Dictionary<string, object>();

            foreach (var child in FormPanel.Children)
            {
                if (child is StackPanel panel && panel.Children[1] is TextBox tb)
                {
                    string columnName = tb.Tag.ToString();
                    string value = tb.Text.Trim();

                    
                    if ((currentTableName == "felhasznalok" || currentTableName == "vasarlo") && columnName == "jelszo")
                    {
                        value = HashPassword(value);
                    }

                    NewData[columnName] = string.IsNullOrWhiteSpace(value) ? DBNull.Value : value;
                }
            }

            DialogResult = true;
            Close();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }

        private string HashPassword(string plainText)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(plainText);
                byte[] hash = sha256.ComputeHash(bytes);
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }

    }
}
