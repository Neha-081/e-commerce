module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        <link rel="icon" href="https://cdn-icons.flaticon.com/png/512/1739/premium/1739005.png?token=exp=1644329975~hmac=be3a999d3c57d25bb4d97ea1b7f508f1" >
        <title>Beautify</title>
        </head>

      <body class="admin">
        <header>
          <nav class="navbar navbar-bottom">
            <div class="container navbar-container">
              <div>
                <a href="/admin">
                  <h3 class="title">Admin Panel</h3>
                </a>
              </div>
              <div class="navbar-item">
                <div class="navbar-buttons">
                  <div class="navbar-item">
                    <a href="/"><i class="fa fa-star"></i> Products</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div class="container">
          ${content}
        </div>
      </body>
    </html>
  `;
};
