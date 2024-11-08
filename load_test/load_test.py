import requests
import threading

HOSTNAME = "http://34.124.255.237:8080"
URL_TO_TEST = f"{HOSTNAME}/questions"
THREADS_TO_SPAWN = 20
WORK_PER_THREAD = 100

def sendRequest():
  for i in range(WORK_PER_THREAD):
    r = requests.get(url=URL_TO_TEST)

if __name__ == "__main__":
  thread_list = []
  for i in range(THREADS_TO_SPAWN):
    thread = threading.Thread(target=sendRequest)
    thread_list.append(thread)

  for thread in thread_list:
    thread.start()
  
  for thread in thread_list:
    thread.join()