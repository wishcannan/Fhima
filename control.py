from flask import Flask,render_template

app = Flask(__name__,template_folder='./template/home',static_folder='./template/home/public')


@app.route('/')
def index():
    return render_template('樱花庄の宿舍.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/aboutme')
def aboutme():
    return render_template('aboutme.html')

@app.route('message')
def message():
    return render_template('message.html')

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 40

@app.errorhandler(DatabaseError)
def special_exception_handler(error):
    return 'Database connection failed', 500

if __name__ == '__main__':
    app.run(host='0,0,0,0',port = 5000)


