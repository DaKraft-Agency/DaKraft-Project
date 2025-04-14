<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'C:/wamp64/www/DaKraft/vendor/autoload.php'; // Assurez-vous que le chemin est correct

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $prenom = htmlspecialchars($_POST['prenom']);
    $nom = htmlspecialchars($_POST['nom']);
    $telephone = htmlspecialchars($_POST['telephone']);
    $email = htmlspecialchars($_POST['email']);
    $entreprise = htmlspecialchars($_POST['entreprise']);
    $siteType = htmlspecialchars($_POST['site-type']);
    $budget = htmlspecialchars($_POST['budget']);
    $siteObjectif = htmlspecialchars($_POST['site-objectif']);
    $siteOption = htmlspecialchars($_POST['option']);

    $to = "lahatzarr10@gmail.com"; // Remplacez par votre adresse email
    $subject = "Nouveau formulaire soumis";

    $message = "
    <html>
    <head>
        <title>Nouveau formulaire soumis</title>
    </head>
    <body>
        <h2>Informations Personnelles</h2>
        <table>
            <tr>
                <th>Prénom</th><td>$prenom</td>
            </tr>
            <tr>
                <th>Nom</th><td>$nom</td>
            </tr>
            <tr>
                <th>Téléphone</th><td>$telephone</td>
            </tr>
            <tr>
                <th>Email</th><td>$email</td>
            </tr>
        </table>
        <h2>Entreprise & Projet</h2>
        <table>
            <tr>
                <th>Nom de l'entreprise</th><td>$entreprise</td>
            </tr>
            <tr>
                <th>Secteur d'activité</th><td>$siteType</td>
            </tr>
            <tr>
                <th>Budget</th><td>$budget</td>
            </tr>
            <tr>
                <th>Objectif du site</th><td>$siteObjectif</td>
            </tr>
        </table>
        <h2>Type de site voulu</h2>
        <table>
            <tr>
                <th>Option</th><td>$siteOption</td>
            </tr>
        </table>
    </body>
    </html>
    ";

    $mail = new PHPMailer(true);



    try {
        // Paramètres du serveur
        $mail->isSMTP();
        $mail->Host = 'smtp-relay.brevo.com'; // Remplacez par votre serveur SMTPc
        $mail->SMTPAuth = true;
        $mail->Username = '87aec5001@smtp-brevo.com'; // Remplacez par votre adresse email
        $mail->Password = 'Pds3XDrFgpUN72Wm'; // Remplacez par votre mot de passe
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Destinataires
        $mail->setFrom('dakraft.agency@gmail.com', 'DaKraft'); // Remplacez par votre domaine
        $mail->addAddress('dakraft.agency@gmail.com');

        // Contenu de l'email
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo 'Email envoyé avec succès.';
    } catch (Exception $e) {
        echo "Échec de l'envoi de l'email. Erreur: {$mail->ErrorInfo}";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
?>