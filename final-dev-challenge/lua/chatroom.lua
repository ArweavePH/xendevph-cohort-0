local json = require('json')

Rooms = Rooms or {
    General = {
        members = {{
            address = ao.id,
            nickname = "System"
        }},
        messages = {{
            user = {
                address = ao.id,
                nickname = "System"
            },
            content = {
                type = "text",
                value = "Welcome to the General room!"
            },
            timestamp = os.time()
        }}
    }
}
Users = Users or {{
    address = ao.id,
    nickname = "System"
}}

Handlers.add("register", Handlers.utils.hasMatchingTag("Action", "Register"), function(msg)
    local userExists = false
    local newUser = {
        address = msg.From,
        nickname = msg.Data
    }

    for _, account in ipairs(Users) do
        if account.address == newUser.address then
            userExists = true
            break
        end
    end

    if userExists then
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "User already exists."
        }))(msg)
    else
        table.insert(Users, newUser)
        table.insert(Rooms["General"].members, newUser)

        Handlers.utils.reply(json.encode({
            status = 1,
            message = "Successfully registered!"
        }))(msg)
    end
end)

Handlers.add("create_room", Handlers.utils.hasMatchingTag("Action", "CreateRoom"), function(msg)
    local room_name = json.decode(msg.Data).room_name
    local user = msg.From

    local userExists = false
    local userData = {}

    for _, account in ipairs(Users) do
        if account.address == user then
            userExists = true
            userData = account
            break
        end
    end

    if not userExists then
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "User is not registered."
        }))(msg)
        return
    end

    if not Rooms[room_name] then
        Rooms[room_name] = {
            admin = {userData},
            members = {userData},
            messages = {}
        }
        Handlers.utils.reply(json.encode({
            status = 1,
            message = "Room created successfully!"
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room already exists!"
        }))(msg)
    end
end)

Handlers.add("join_room", Handlers.utils.hasMatchingTag("Action", "JoinRoom"), function(msg)
    local room_name = json.decode(msg.Data).room_name
    local user = msg.From

    local userExists = false
    local userData = {}

    for _, account in ipairs(Users) do
        if account.address == user then
            userExists = true
            userData = account
            break
        end
    end

    if not userExists then
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "User is not registered."
        }))(msg)
        return
    end

    if Rooms[room_name] then
        local isMember = false
        for _, member in ipairs(Rooms[room_name].members) do
            if member.address == user then
                isMember = true
                break
            end
        end

        if isMember then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "User is already a member of the room."
            }))(msg)
        else
            table.insert(Rooms[room_name].members, userData)
            Handlers.utils.reply(json.encode({
                status = 1,
                message = "Joined Room."
            }))(msg)
        end
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room doesnt exists."
        }))(msg)
    end
end)

Handlers.add("my_list_rooms", Handlers.utils.hasMatchingTag("Action", "MyListRooms"), function(msg)
    local user = msg.Data
    local room_list = {}

    for room_name, room_data in pairs(Rooms) do
        for _, member in ipairs(room_data.members) do
            if member.address == user then
                table.insert(room_list, {
                    room_name = room_name,
                    members = #room_data.members
                })
                break
            end
        end
    end

    Handlers.utils.reply(json.encode({
        status = 1,
        data = room_list
    }))(msg)
end)

Handlers.add("broadcast", Handlers.utils.hasMatchingTag("Action", "Broadcast"), function(msg)
    local room_name = json.decode(msg.Data).room_name
    local user = msg.From

    local userExists = false
    local userData = {}

    for _, account in ipairs(Users) do
        if account.address == user then
            userExists = true
            userData = account
            break
        end
    end

    if not userExists then
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "User is not registered."
        }))(msg)
        return
    end

    local contentData = json.decode(msg.Data).content

    if Rooms[room_name] then
        table.insert(Rooms[room_name].messages, {
            user = userData,
            content = {
                type = contentData.type,
                value = contentData.value
            },
            timestamp = os.time()
        })

        for _, account in ipairs(Rooms[room_name].members) do
            ao.send({
                Target = account.address,
                Data = {
                    type = contentData.type,
                    value = contentData.value
                }
            })
        end

        Handlers.utils.reply(json.encode({
            status = 1,
            message = "Message sent!"
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room does not exist."
        }))(msg)
    end
end)

Handlers.add("get_messages", Handlers.utils.hasMatchingTag("Action", "GetMessages"), function(msg)
    local data = json.decode(msg.Data)
    local room_name = data.room_name
    local page = data.page or 1
    local pageSize = data.pageSize or 10

    if Rooms[room_name] then
        local messages = Rooms[room_name].messages
        local totalMessages = #messages
        local totalPages = math.ceil(totalMessages / pageSize)

        if page > totalPages then
            Handlers.utils.reply(json.encode({
                status = 0,
                message = "Page out of range",
                totalPages = totalPages
            }))(msg)
            return
        end

        local startIdx = totalMessages - ((page - 1) * pageSize)
        local endIdx = math.max(startIdx - pageSize + 1, 1)

        local paginatedMessages = {}
        for i = startIdx, endIdx, -1 do
            table.insert(paginatedMessages, 1, messages[i])
        end

        Handlers.utils.reply(json.encode({
            status = 1,
            data = {
                messages = paginatedMessages,
                currentPage = page,
                totalPages = totalPages
            }
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room does not exist."
        }))(msg)
    end
end)

Handlers.add("get_members", Handlers.utils.hasMatchingTag("Action", "GetMembers"), function(msg)
    local room_name = json.decode(msg.Data).room_name
    if Rooms[room_name] then
        Handlers.utils.reply(json.encode({
            status = 1,
            data = Rooms[room_name].members
        }))(msg)
    else
        Handlers.utils.reply(json.encode({
            status = 0,
            message = "Room does not exist."
        }))(msg)
    end
end)

Handlers.add("user_info", Handlers.utils.hasMatchingTag("Action", "UserInfo"), function(msg)
    local user = msg.Data

    local userExists = false
    local userData = {}

    for _, account in ipairs(Users) do
        if account.address == user then
            userExists = true
            userData = account
            break
        end
    end

    if userExists then
        Handlers.utils.reply(json.encode({
            status = 1,
            data = userData
        }))(msg)
        return
    end

    Handlers.utils.reply(json.encode({
        status = 0,
        data = nil
    }))(msg)
end)

