NEXTYEAR = 1749168000000
NOW = 0

function onTick()
    for i = 0, NEXTYEAR do
        if i % 1000 == 0 then
            print("Iteration " .. i .. ": Performing periodic operation")
        end
    end
end

Handlers.add("testtick", Handlers.utils.hasMatchingTag("Action", "Tick"), function(msg)
    onTick()
    print("hello")
end)
