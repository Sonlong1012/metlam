from django.shortcuts import redirect, render
from .models import Member
from django.db.models import Q  # Import Q for complex queries
from django.contrib.auth.hashers import make_password



def index(request):
    query = request.GET.get('q', '')  # Get the search query from the URL parameter 'q'

    if query:
        mem = Member.objects.filter(
            Q(name__icontains=query) |  # Case-insensitive search for first name
            Q(description__icontains=query) |  # Case-insensitive search for first name
            Q(type__icontains=query) # Case-insensitive search for last name

        )
    else:
        mem = Member.objects.all()

    return render(request, 'index.html', {'mem': mem, 'query': query})


def add(request):
    return render(request, 'add.html')


def addrec(request):
    # Lấy thông tin từ dữ liệu POST gửi từ biểu mẫu thêm thành viên

    s = request.POST['name']
    i = request.POST['description']
    b = request.POST['type']
    # Tạo đối tượng `Member` mới với thông tin này và lưu vào cơ sở dữ liệu
    mem = Member(name=s, description=i, type=b)
    mem.save()
    return redirect("/")


def delete(request, id):
    mem = Member.objects.get(id=id)
    mem.delete()
    return redirect("/")



def register(request):
    if request.method == 'POST':
        # Get form data
        name = request.POST.get('name', '')
        description = request.POST.get('description', '')
        type = request.POST.get('type', '')

        # Create a new Member instance and save it to the database
        member = Member(name=name, description=description, type=type)

        try:
            member.save()
        except Exception as e:
            print(f"Error saving member: {e}")

        # Redirect to the index page or any other page you want
        return redirect('index')

    # If it's a GET request, just render the empty form
    return render(request, 'register.html')




def update(request, id):
    mem = Member.objects.get(id=id)
    return render(request, 'update.html', {'mem': mem})





def uprec(request, id):
    x = request.POST['name']
    s = request.POST['description']
    i = request.POST['type']

    mem = Member.objects.get(id=id)
    mem.name = x
    mem.description = s
    mem.type = i

    mem.save()
    return redirect("/")


from django.shortcuts import render

# Create your views here.
