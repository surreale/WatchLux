using System;
using System.Collections.Generic;
using System.Data;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace BejelentkezesApp
{
    public partial class EditDataWindow : Window
    {
        public Dictionary<string, object> UpdatedData { get; private set; }
        private readonly DataRowView originalRow;

        // 🔁 Ugyanaz a mapping mint AddDataWindow-ban
        private readonly Dictionary<string, string> columnHeaderMapping = new()
        {
            { "id", "Felhasználó azonosító/" },
            { "nev", "Név/" },
            { "felhasznalonev", "Felhasználónév/" },
            { "jelszo", "Jelszó/" },
            { "jogosultsag", "Jogosultság/" },
            { "vasarloaz", "Vásárló azonosító/" },
            { "vnev", "Vásárló Neve/" },
            { "tel", "Telefonszám/" },
            { "email", "Email/" },
            { "szallitasaz", "Szállítás azonosító/" },
            { "sznev", "Szállítási Név/" },
            { "cim", "Cím/" },
            { "iranyszam", "Irányítószám/" },
            { "varos", "Város/" },
            { "szamlaaz", "Számla azonosító/" },
            { "datum", "Dátum/" },
            { "adoszam", "Adószám/" },
            { "oraaz", "Óra azonosító/" },
            { "oranev", "Óra neve/" },
            { "db", "Darabszám/" },
            { "ar", "Ár/" },
            { "cikkszam", "Cikkszám/" },
            { "megnevezes", "Megnevezés/" },
            { "tipus", "Típus/" },
            { "marka", "Márka/" },
            { "jotallas", "Jótállás/" },
            { "szij", "Szíj/" },
            { "szijszine", "Szíj színe/" },
            { "atok", "Tok/" },
            { "atokszine", "Tok színe/" },
            { "szamlaptipus", "Számlap típus/" },
            { "szamlapszine", "Számlap színe/" },
            { "meretmillimeterben", "Méret (mm)/" },
            { "sulygrammban", "Súly (g)/" },
            { "vizallosag", "Vízállóság/" },
            { "meghajtas", "Meghajtás/" },
            { "kristalyuveg", "Üveg típusa/" },
            { "datumkijelzes", "Dátumkijelzés/" },
            { "extrafunkcio", "Extrafunkció/" },
            { "raktar", "Raktár/" },
            { "oraforma", "Óraforma/" },
            { "nem", "Nem/" },
            { "maxcsuklomili", "Max. csukló méret (mm)/" },
            { "fizetesmod", "Fizetési mód/" }
        };

        public EditDataWindow(DataRowView rowView)
        {
            InitializeComponent();
            originalRow = rowView;
            GenerateForm();
        }

        private void GenerateForm()
        {
            foreach (DataColumn column in originalRow.Row.Table.Columns)
            {
                string name = column.ColumnName.ToLower();
                if (column.AutoIncrement || name.EndsWith("id") || name.EndsWith("az"))
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
                    Width = 380,
                    Text = originalRow.Row[column]?.ToString() ?? ""
                };

                row.Children.Add(label);
                row.Children.Add(input);
                FormPanel.Children.Add(row);
            }
        }

        private void Save_Click(object sender, RoutedEventArgs e)
        {
            UpdatedData = new Dictionary<string, object>();

            foreach (var child in FormPanel.Children)
            {
                if (child is StackPanel panel && panel.Children[1] is TextBox tb)
                {
                    string columnName = tb.Tag.ToString();
                    string value = tb.Text.Trim();
                    UpdatedData[columnName] = string.IsNullOrWhiteSpace(value) ? DBNull.Value : value;
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
    }
}
